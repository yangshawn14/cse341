const julieRoute = (req, res) => {
    res.send("Julie Xiong");
  };

const shawnRoute = (req, res) => {
    res.send("Shawn Yang");
};

module.exports = {
    julieRoute,
    shawnRoute
};