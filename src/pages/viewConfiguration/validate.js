const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.description) {
    errors.description = "Required";
  }
  if (!values.microfrontends || !values.microfrontends.length) {
    errors.microfrontends = {
      _error: "At least one microfrontend must be entered",
    };
  } else {
    const microfrontendArrayErrors = [];
    values.microfrontends.forEach((mf, mfIndex) => {
      const mfErrors = {};
      if (!mf || !mf.microfrontendKey) {
        mfErrors.microfrontendKey = mfErrors;
      }
      if (!mf || !mf.sizes || !mf.sizes.xs) {
        mfErrors.sizes.xs = "Required";
        microfrontendArrayErrors[mfIndex] = mfErrors;
      }
      if (!mf || !mf.sizes || !mf.sizes.sm) {
        mfErrors.sizes.sm = "Required";
        microfrontendArrayErrors[mfIndex] = mfErrors;
      }
      if (!mf || !mf.sizes || !mf.sizes.md) {
        mfErrors.sizes.md = "Required";
        microfrontendArrayErrors[mfIndex] = mfErrors;
      }
      if (!mf || !mf.sizes || !mf.sizes.lg) {
        mfErrors.sizes.lg = "Required";
        microfrontendArrayErrors[mfIndex] = mfErrors;
      }
      if (!mf || !mf.sizes || !mf.sizes.xl) {
        mfErrors.sizes.xl = "Required";
        microfrontendArrayErrors[mfIndex] = mfErrors;
      }
    });
    if (microfrontendArrayErrors.length) {
      errors.members = microfrontendArrayErrors;
    }
  }
  return errors;
};

export default validate;
