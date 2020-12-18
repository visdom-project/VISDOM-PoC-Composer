import constants from '../constants';

/**
 * Retrieve the view configuration for the specified role.
 *
 * @param {string} role - The role you are interested in.
 * @param {*} roles - All available roles.
 * @param {*} views - All available views.
 * @return {*} - The default view for the role.
 */
const roleDefaultView = (role, roles, views) => {
  const roleConfig = roles.find((r) => r.id === role);
  if (!roleConfig || !roleConfig.defaultView || !roleConfig.defaultView.id) {
    return null;
  }

  const view = views.find((view) => view.id === roleConfig.defaultView.id);
  if (!view) {
    return null;
  }
  return view;
};

function assetURL(url) {
  return constants.assetPath + "/" + url;
}

const Utilities = {
  roleDefaultView: roleDefaultView,
  assetURL: assetURL,
};

export default Utilities;
