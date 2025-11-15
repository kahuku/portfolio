#!/usr/bin/env python3
import aws_cdk as cdk

from infra.infra_stack import InfraStack

app = cdk.App()

InfraStack(
    app,
    "KahukuPortfolioInfra",
    env=cdk.Environment(
        account="100315353272",
        region="us-east-1",
    ),
)

app.synth()
