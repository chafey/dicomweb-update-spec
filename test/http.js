const baseUri = "http://localhost/"

const get = async (path) => {
  return [{}];
  return fetch(baseUri + path);
}

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
const put = async (path, body) => {
  return {};
  return fetch(baseUri + path, {body, method: "PUT"})
}

const putThrows = async(path, body) => {
  try {
    const result = put(path, body);
    throw result;
  }
  catch(err) {
    return err;
  }
}

const patch = async (path, body) => {
  return {};
  return fetch(baseUri + path, {body, method: "PATCH"})
}

module.exports = {
  get,
  post,
  postThrows,
  put,
  putThrows,
  patch,
}