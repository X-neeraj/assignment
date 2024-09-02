const https = require('https');

function fetchData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

const extract = (data) => {
    const startDiv = '<div class="partial latest-stories" data-module_name="Latest Stories">';
    const endDiv = '</section>';
    let start = data.indexOf(startDiv);
    if (start === -1) {
      console.error('Something went wrong');
      return '';
    }
    start += startDiv.length;
    const end = data.indexOf(endDiv, start);
    if (end === -1) {
      console.error('Something went wrong');
      return ''; 
    }
    return data.substring(start, end).trim();
  };

  function parseData(html) {
    const stories = [];

    const listItems = html.match(/<li class="latest-stories__item">[\s\S]*?<\/li>/g);
    
    if (listItems) {
      listItems.forEach(item => {
        const title = item.match(/<h3 class="latest-stories__item-headline">([^<]+)<\/h3>/);
        const link = item.match(/<a href="([^"]+)"/);
        if (title && link) {
          stories.push({
            title: title[1].trim(),
            link: "https://time.com"+link[1].trim()
          });
        }
      });
    }
    return stories;
  }
  
  const fetchLatest= async () => {
    try {
      const html = await fetchData('https://time.com/');
      var latestContent = extract(html);
      return parseData(latestContent);
    } catch (error) {
      console.error('Error fetching HTML:', error);
    }
  };

module.exports = { fetchLatest };

  
  
  