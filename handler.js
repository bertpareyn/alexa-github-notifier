'use strict';

const octokit = require('@octokit/rest')()
const _get = require('lodash.get');

let parseSlots = (slots) => {
  let slotLabel = _get(slots, 'label.resolutions.resolutionsPerAuthority[0].values[0].value');

  return slotLabel.name;
};

/**
 * Get a count of open PRs
 *
 * @param  {Object}    slots    The slots filled in by Alexa
 *
 * @return {String} The open PR count sentence
 */
let getPRCount = async (slots) => {
  let issues = null;

  // Parse the slots into a Github understandable label
  let label = parseSlots(slots);

  if (!label) return `Sorry, I did not understand which count you want.`

  // Authenticate with Github
  octokit.authenticate({
    type: 'token',
    token: process.env.GITHUB_TOKEN
  });

  // Get the open issues in the repo
  issues = await octokit.paginate('GET /repos/:owner/:repo/issues', {
    owner: 'BlockChainCompany',
    repo: 'tessa-platform',
    labels: label
  });

  return `There are ${issues.length} pull requests with label "${label}".`;
};

/**
 * Build a response for Alexa to parse
 *
 * @param  {String}    response    The string of text for Alexa to read out loud
 */
let buildResponse = (response) => {
    return {
        version: '1.0',
        response: {
            outputSpeech: {
                type: 'PlainText',
                text: response,
            },
            shouldEndSession: true,
        },
        sessionAttributes: {},
    };
};

/**
 * Route the logic depending on the Alexa input
 *
 * @param  {[type]}   event    [description]
 * @param  {[type]}   context  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
module.exports.execute = async (event, context, callback) => {
  console.log('EVENT', event);

  try {
      if (event.request.type === 'LaunchRequest') {
          callback(null, buildResponse('Please state your business'));
      } else if (event.request.type === 'IntentRequest') {
          const intentName = event.request.intent.name;

          if (intentName === 'PRCountIntent') {
              let prCountResponse = await getPRCount(event.request.intent.slots);
              callback(null, buildResponse(prCountResponse));
          } else {
              callback(null, buildResponse("Sorry, I don't understand"));
          }
      } else if (event.request.type === 'SessionEndedRequest') {
          callback(null, buildResponse('Session Ended'));
      }
  } catch (e) {
      context.fail(`Exception: ${e}`);
  }
}
