const julieRoute = (req, res) => {
    res.send("Julie Xiong");
  };

const shawnRoute = (req, res) => {
    res.send("Shawn Yang");
};

const troyRoute = (req, res) => {
    res.send('Troy Yang');
};

module.exports = {
    julieRoute,
    shawnRoute,
    troyRoute
};