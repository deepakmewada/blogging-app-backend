exports.upload = (req, res) => {
  try {
    let image = {
      fileName: req.file.filename,
      path: req.file.path,
    };
    return res.status(200).send({ data: image });
  } catch (e) {
    return res.status(500).send({ message: e });
  }
};
