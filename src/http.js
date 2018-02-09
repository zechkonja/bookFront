/**
 * EasyHTTP Library
 * Library for making HTTP requests
 *
 * @version 3.0.0
 * @author NN
 * @licence MIT
 *
 */

class EasyHTTP {
  // Make http GET request
  async get(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  // make HTTP POST request
  async post(url, data) {

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    return resData;
  }

  // Make an HTTP PUT Request
  async put(url, data) {

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const resData = await response.json();
    return resData;
  }

  // Make an HTTP DELETE Request
  async delete(url) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });

    const resData = await 'Resourse deleted';
    return resData;
  }

}
// Export class!!!
export const http = new EasyHTTP();
