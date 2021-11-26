const uploadPhotoValidator = (value, { req }) => {
  const photo = req?.files?.photo;

  if (!value || !photo) throw new Error("Nincs megadva kép vagy album cím!");

  return true;
};

module.exports = uploadPhotoValidator;
