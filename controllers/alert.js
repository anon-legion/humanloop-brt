import { Humanloop } from "humanloop";

// initialize humanloop
const humanloop = new Humanloop({
  apiKey: process.env.HUMANLOOP_API_KEY,
});

const getAlertGPT4 = async (req, res) => {
  console.log('inside getAlertGPT4');
  try {
    const { grossSales, txnCount, timeIn, currentTime } = req.body;
    // res.status(200).json({ message: process.env.OPENAI_API_KEY });
    const gptResponse = await humanloop.generate({
      project: "BRT",
      inputs: {
        "GrossSales": grossSales,
        "TranCount": txnCount,
        "TimeIn": timeIn,
        "CurrentTime": currentTime
      },
      provider_api_keys: {
        "openai": process.env.OPENAI_API_KEY,
      }
    });

    console.log(gptResponse)

    res.status(200).json({ message: gptResponse });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getAlertGPT4;