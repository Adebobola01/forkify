import { async } from 'regenerator-runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, upload = undefined) {
  try {
    const fetchPro = upload
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/JSON',
          },
          body: JSON.stringify(upload),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(10)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {}
};

// export const getJSON = async function (url) {
//   try {
//     //FETCHING AND STORING DATA
//     const fetchPro = fetch(url);
//     const res = await Promise.race([fetchPro, timeout(10)]);
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const sendJSON = async function (url, upload) {
//   try {
//     //FETCHING AND STORING DATA
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/JSON',
//       },
//       body: JSON.stringify(upload),
//     });
//     const res = await Promise.race([fetchPro, timeout(10)]);
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
