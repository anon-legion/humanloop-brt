import axios from 'axios';

const options = {
  method: 'POST',
  url: 'https://api.humanloop.com/v3/generate',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
    'X-API-KEY': 'hl_sk_e60a6fa9b619b25193743dd4a64e6391ec2f595b127b0b56',
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
    },
  },
};

const getAlertGPT4 = async (req, res) => {
  console.log('inside getAlertGPT4');
  try {
    const gptResponse = await axios.request(options);
    res.status(200).json({ data: gptResponse.data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getAlertGPT4;
