# Alexa Skills, basic example
Repo created to play around with Alexa skills.

## Setup
- Create a free AWS account at https://aws.amazon.com/console/ to which you'll push the lambda
- Clone repository
- Set your `GITHUB_TOKEN` in the AWS SSM Parameter Store (`us-east-1`)
- npm run deploy (Deploys to `us-east-1`, only region supported at this time)
- Log in to https://developer.amazon.com and create a new Alexa skill with the following JSON:

```json
{
    "interactionModel": {
        "languageModel": {
            "invocationName": "code monkey",
            "intents": [
                {
                    "name": "AMAZON.FallbackIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.CancelIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.HelpIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.StopIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.NavigateHomeIntent",
                    "samples": []
                },
                {
                    "name": "PRCountIntent",
                    "slots": [
                        {
                            "name": "type",
                            "type": "TYPE"
                        },
                        {
                            "name": "label",
                            "type": "LABEL"
                        }
                    ],
                    "samples": [
                        "how many {type} are {label}",
                        "how many {type} need {label}",
                        "how many {type} have the label {label}",
                        "how many {type} are in {label}"
                    ]
                }
            ],
            "types": [
                {
                    "name": "TYPE",
                    "values": [
                        {
                            "name": {
                                "value": "pull requests"
                            }
                        }
                    ]
                },
                {
                    "name": "LABEL",
                    "values": [
                        {
                            "name": {
                                "value": "needs app review",
                                "synonyms": [
                                    "need app review",
                                    "need an app review"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "waiting for app",
                                "synonyms": [
                                    "to wait for the app"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "release",
                                "synonyms": [
                                    "a release"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "ready to merge",
                                "synonyms": [
                                    "merging"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "needs security review",
                                "synonyms": [
                                    "security review"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "do not merge"
                            }
                        },
                        {
                            "name": {
                                "value": "more work needed",
                                "synonyms": [
                                    "more work"
                                ]
                            }
                        },
                        {
                            "name": {
                                "value": "needs review",
                                "synonyms": [
                                    "review",
                                    "need a review",
                                    "need review"
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    }
}
```
- Save model
- Log in to the AWS console and add a trigger for the Alexa Skills to your lambda. Fill in the Alexa Skill ARN.
- In the Alexa developer console, add the ARN of your lambda
- Save model
- Build model
- Use Alexa on your phone, one of the echo devices or the simulator in the developer portal

## Using the skill
Even without publishing the skill should be available simply by logging into the Alexa app, echo device or simulator with the developer account you used to set it up.

### Commands
- `Alexa, open code monkey`
- `Alexa, open code monkey and ask how many pull requests are ready to merge`
- `Alexa, open code monkey and ask how many pull requests need security review`
- `Alexa, open code monkey and ask how many pull requests have the label more work needed`
- `Alexa, open code monkey and ask how many pull requests are in review`

## Notes
- If your Github repository uses different issue labels you'll need to adjust the slots in the Alexa interface, or in the JSON provided here.

## Other commands
- Delete the lambda with `npm run remove`
- Invoke the lambda locally with `npm run invoke`
