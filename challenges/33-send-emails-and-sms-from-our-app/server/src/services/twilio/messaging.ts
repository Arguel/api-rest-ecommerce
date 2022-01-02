import {Twilio} from "twilio";
import config from "config";
import {IConfigDefault} from "../../config/default";

const {
  default: {
    twilio: {accountSid, authToken, myNumber, twilioNumber},
  },
} = config as IConfigDefault;

export const client = new Twilio(accountSid, authToken);

export const clientOpt = {
  body: "Hello from Node",
  to: myNumber, // Text this number
  from: twilioNumber, // From a valid Twilio number
};
