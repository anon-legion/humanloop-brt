import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

// todo: create factory function to create options object

const postOptionsFactory = (grossSales, txnCount, timeIn) => {
  // initialize new date object
  const now = new Date();
  // return options object for axios request
  return {
    method: 'POST',
    url: 'https://api.humanloop.com/v3/generate',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.HUMANLOOP_API_KEY,
    },
    data: {
      project: 'BRT',
      inputs: {
        grossSales,
        txnCount,
        timeIn,
        currentTime: `${now.getHours()}:${now.getMinutes()}`,
      },
      provider_api_keys: {
        openai: process.env.OPENAI_API_KEY,
      },
    },
  };
};

const getAlertGPT4 = async (req, res) => {
  // console.log(req.body);
  // destructure inputs from request body
  const { grossSales, txnCount, timeIn } = req.body;
  // create options object for axios request
  const options = postOptionsFactory(grossSales, txnCount, timeIn);

  try {
    // make request to gpt4 from humanloop api
    const gptResponse = await axios.request(options);
    // destructure output from gptResponse
    const { output } = gptResponse.data.data[0];

    res.status(StatusCodes.OK).json({
      // normalize response: split output by newline and filter out empty strings
      gptData: output.split('\n').filter((val) => val !== ''),
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

export default getAlertGPT4;
