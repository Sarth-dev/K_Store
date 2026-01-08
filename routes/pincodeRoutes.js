const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/check", async (req, res) => {
  const { pincode } = req.query;

  if (!pincode) {
    return res.status(400).json({ message: "Pincode required" });
  }

  try {
    const response = await axios.get(
      "https://track.delhivery.com/c/api/pin-codes/json/?filter_codes=pin_code",
      {
        params: { filter_codes: pincode },
        headers: {
          Authorization: `Token ${process.env.DELHIVERY_TOKEN}`,
        },
      }
    );

    const data = response.data;
    // console.log("data", data);

    if (!data?.delivery_codes?.length) {
      return res.json({ available: false });
    }

    const info = data.delivery_codes[0].postal_code;

    res.json({
      available: true,
      city: info.city,
      state: info.state,
      cod: info.cod === "Y",
      prepaid: info.pre_paid === "Y",
    });
  } catch (error) {
    console.error("Delhivery error:", error.message);
    res.status(500).json({ message: "Pincode check failed" });
  }
});

module.exports = router;
