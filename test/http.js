const baseUri = "http://localhost/"
const post = async (path, body) => {
  return {};
  return fetch(baseUri + path, {body, method: "POST"})
}

const postThrows = async(path, body) => {
  try {
    const result = post(path, body);
    throw result;
  }
  catch(err) {
    return err;
  }
}

const get = async (path) => {
  return {};
  return fetch(baseUri + path);
}

module.exports = {
  post,
  postThrows,
  get
}