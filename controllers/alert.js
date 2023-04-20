import axios from 'axios';

// todo: create factory function to create options object

const options = {
  method: 'POST',
  url: 'https://api.humanloop.com/v3/generate',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
    'X-API-KEY': 'hl_sk_e60a6fa9b619b25193743dd4a64e6391ec2f595b127b0b56',
    // 'X-API-KEY': process.env.HUMANLOOP_API_KEY,
  },
  data: {
    project: 'BRT',
    inputs: {
      grossSales: '42069',
      txnCount: '696',
      timeIn: '9:45',
      currentTime: '15:29',
    },
    provider_api_keys: {
      openai: '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',
      // openai: process.env.OPENAI_API_KEY,
    },
  },
};

const getAlertGPT4 = async (req, res) => {
  try {
    // make request to gpt4 from humanloop api
    const gptResponse = await axios.request(options);
    // destructure output from gptResponse
    const { output } = gptResponse.data.data[0];

    res.status(200).json({
      // split output by newline and filter out empty strings
      gptData: output.split('\n').filter((val) => val !== ''),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getAlertGPT4;
