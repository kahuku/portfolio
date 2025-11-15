from aws_cdk import (
    Stack,
    Duration,
    CfnOutput,
)
from aws_cdk import aws_s3 as s3
from aws_cdk import aws_cloudfront as cloudfront
from aws_cdk import aws_cloudfront_origins as origins
from aws_cdk import aws_iam as iam
from aws_cdk import aws_route53 as route53
from aws_cdk import aws_certificatemanager as acm
from aws_cdk import aws_route53_targets as targets
from constructs import Construct


class InfraStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # ---------------------------------------------------
        # Use EXISTING hosted zone for kahuku.dev (Route 53)
        # ---------------------------------------------------
        hosted_zone = route53.HostedZone.from_lookup(
            self,
            "ExistingHostedZone",
            domain_name="kahuku.dev",
        )

        # ---------------------------------------------------
        # S3 bucket to hold the React build output (private)
        # ---------------------------------------------------
        site_bucket = s3.Bucket(
            self,
            "SiteBucket",
            block_public_access=s3.BlockPublicAccess.BLOCK_ALL,
            enforce_ssl=True,
        )

        # ---------------------------------------------------
        # CloudFront Origin Access Identity (OAI)
        # ---------------------------------------------------
        oai = cloudfront.OriginAccessIdentity(
            self,
            "SiteOAI",
            comment="OAI for kahuku.dev portfolio distribution",
        )

        # Explicit bucket policy: allow OAI to read objects
        site_bucket.add_to_resource_policy(
            iam.PolicyStatement(
                actions=["s3:GetObject"],
                resources=[site_bucket.arn_for_objects("*")],
                principals=[
                    iam.CanonicalUserPrincipal(
                        oai.cloud_front_origin_access_identity_s3_canonical_user_id
                    )
                ],
            )
        )

        # ---------------------------------------------------
        # ACM Certificate (DNS-validated via Route 53)
        # ---------------------------------------------------
        certificate = acm.DnsValidatedCertificate(
            self,
            "SiteCertificate",
            domain_name="kahuku.dev",
            subject_alternative_names=["www.kahuku.dev"],
            hosted_zone=hosted_zone,
            region="us-east-1",  # same as stack region & CloudFront requirement
        )

        # ---------------------------------------------------
        # CloudFront Distribution in front of S3
        # ---------------------------------------------------
        distribution = cloudfront.Distribution(
            self,
            "SiteDistribution",
            default_root_object="index.html",
            domain_names=["kahuku.dev", "www.kahuku.dev"],
            certificate=certificate,
            default_behavior=cloudfront.BehaviorOptions(
                origin=origins.S3Origin(
                    site_bucket,
                    origin_access_identity=oai,
                ),
            ),
            error_responses=[
                cloudfront.ErrorResponse(
                    http_status=404,
                    response_http_status=200,
                    response_page_path="/index.html",
                    ttl=Duration.minutes(5),
                )
            ],
        )

        # ---------------------------------------------------
        # Route 53 alias records → CloudFront
        # ---------------------------------------------------
        route53.ARecord(
            self,
            "RootAliasRecord",
            zone=hosted_zone,
            record_name="kahuku.dev",
            target=route53.RecordTarget.from_alias(
                targets.CloudFrontTarget(distribution)
            ),
        )

        route53.ARecord(
            self,
            "WwwAliasRecord",
            zone=hosted_zone,
            record_name="www.kahuku.dev",
            target=route53.RecordTarget.from_alias(
                targets.CloudFrontTarget(distribution)
            ),
        )

        # ---------------------------------------------------
        # Outputs
        # ---------------------------------------------------
        CfnOutput(self, "BucketName", value=site_bucket.bucket_name)
        CfnOutput(self, "DistributionId", value=distribution.distribution_id)
        CfnOutput(self, "CloudFrontDomain", value=distribution.domain_name)
        CfnOutput(self, "DomainName", value="https://kahuku.dev")
