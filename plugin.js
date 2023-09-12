import { API } from "./api.js"

const validateData = {
    InstantApiKey: "ENCjRrj71t4Ce1aVQnbL1to5OeqPmjzwuGNA",
    Domain : "https://yogendrapawar.online/"
}

const parsePage = (element, parentPath = []) => {
  const textNodes = [];
  const commonHtmlTags = [
    'DIV', 'SECTION', 'ARTICLE', 'HEADER', 'FOOTER',
    'NAV', 'ASIDE', 'MAIN', 'FIGURE', 'FIGCAPTION',
    'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
    'UL', 'OL', 'LI', 'A', 'SPAN', 'STRONG', 'EM',
    'IMG', 'TABLE', 'TR', 'TD', 'TH',
    'FORM', 'INPUT', 'BUTTON', 'TEXTAREA', 'LABEL',
    'SELECT', 'OPTION', 'BLOCKQUOTE', 'CITE', 'CODE', 'PRE', 'ABBR', 'ADDRESS', 'B', 'I', 'U', 'DEL',
    'INS', 'MARK', 'SMALL', 'SUB', 'SUP', 'TIME', 'S', 'KBD', 'SAMP', 'VAR',
    'BDO', 'Q', 'HR', 'RUBY', 'RT', 'RP', 'DETAILS', 'SUMMARY', 'METER',
    'PROGRESS', 'CANVAS', 'IFRAME', 'VIDEO', 'AUDIO', 'SOURCE', 'TRACK', 'EMBED',
    'OBJECT', 'PARAM', 'TBODY', 'MAIN' , 'HGROUP'
  ];

  const traverse = (element, path) => {
    const children = element.childNodes;

    children.forEach((child, index) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent.trim();
        if (text) {
          const nodePath = [...path, index];
          textNodes.push({ text, path: nodePath, node: child.parentElement });
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        if (commonHtmlTags.some(tagName => tagName === child.tagName && child.tagName !== 'NON-TRANSLATE')) {
          if (child.tagName === 'INPUT' || child.tagName === 'TEXTAREA') {
            const placeholder = child.getAttribute('placeholder');
            if (placeholder) {
              textNodes.push({ text: placeholder, path: [...path, index], node: child });
            }
          } else {
            traverse(child, [...path, index]);
          }
        }
      }
    });
  };



  traverse(element, parentPath);
  return textNodes.map(nodeInfo => {
    const node = nodeInfo.node;
    const nodePath = [];
    let currentNode = node;

    while (currentNode !== document) {
        if (currentNode.parentNode) {
            const tagName = currentNode.tagName.toLowerCase();
            const index = Array.from(currentNode.parentNode.children).indexOf(currentNode) + 1;

            // If an element has an `id` attribute, use it as part of the XPath
            const idAttribute = currentNode.getAttribute('id');
            if (idAttribute) {
                nodePath.unshift(`${tagName}[@id="${idAttribute}"]`);
                break; // Exit the loop because IDs are unique
            }

            nodePath.unshift(`${tagName}[${index}]`);
            currentNode = currentNode.parentNode;
        } else {
            break; // Exit the loop if we reach the document root
        }
    }

    const nodeXPath = nodePath.join('/');
    return { ...nodeInfo, xpath: `/${nodeXPath}` };
  });
};
const parsedData = parsePage(document.body);

const convertedData =  {
  "ApiKey": "ENCjRrj71t4Ce1aVQnbL1to5OeqPmjzwuGNA",
  "DomainName": "https://www.simplylocalize.com",
  "URL": "https://www.simplylocalize.com/home",
  "InstantPhraseList": parsedData.map(item => ({
    "Phrase": item.text,
    "UrlPath": "https://www.simplylocalize.com/home", //ask this in meet
    "XPath": item.xpath
  }))
};



let addphrasedata = convertedData

const addPhrase = (addphrasedata) => {
  API.addphrase({ addphrasedata:  addphrasedata})
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Invalid API');
        }
    })
    .then(data => {
        console.log('API Validation Response:', data);
    })
    .catch(error => {
        console.error('API Validation Error:', error);
    });


}
addPhrase(addphrasedata);


const applyTranslations = (language) => {
  // const details = apiResponse.filePathDetails.find((detail) => detail.language === language);

  // if (!details) {
  //   console.error(`Translations for language ${language} not found.`);
  //   return;
  // }

  // Replace 'apiCallForTranslations' with your actual API call logic
  // apiCallForTranslations(details.filePath)
  //   .then((translations) => {
      // Iterate through translations and update the DOM as you did before
      document.addEventListener('DOMContentLoaded', () => {
        language.Phrases.forEach((phraseInfo) => {
        
        const xpath = phraseInfo.PhraseDetails[0].XPath;
        
        const translatedText = phraseInfo.Phrase;
        const xpathResult = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        const element = xpathResult.singleNodeValue;
        if (element) {
          if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.setAttribute('placeholder', translatedText);
          } else {
            element.textContent = translatedText;
          }
        }
      });
    });
//     })
//     .catch((error) => {S
//       console.error(`Error fetching translations for language ${language}:`, error);
//     window.location.href = window.location.href;
//     });
};    

document.addEventListener('DOMContentLoaded', () => {
API.validateAPI({ validatedata: validateData })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Invalid API');
        }
    })
    .then(data => {
        console.log('API Validation Response:', data);
         const isValidate = data.data.isValidate;
         const details = data.data.filePathDetails
         const options = details.map(item => item.language)
        //  fetch(path[1])
        //     .then(response => response.json())
        //     .then(data => {
        //        console.log(data)
        //     })
        //   .catch(error => {
        //     console.error('Error fetching/parsing JSON:', error);
        //   });
         if (isValidate){
            
           
                const body = document.body;
 
                const dropdownContainer = document.createElement('div');
                dropdownContainer.classList.add('dropdown');
                dropdownContainer.style.position = 'fixed';
                dropdownContainer.style.top = '10px';
                dropdownContainer.style.right = '10px';
                body.appendChild(dropdownContainer);

                const dropdownButton = document.createElement('button');
                dropdownButton.textContent = 'Select an option';
                dropdownButton.id = 'dropdown-btn';
                dropdownButton.style.padding = '10px 20px';
                dropdownButton.style.backgroundColor = '#f0f0f0';
                dropdownButton.style.border = '2px';
                dropdownButton.style.cursor = 'pointer';
                dropdownContainer.appendChild(dropdownButton);

                const dropdownList = document.createElement('ul');
                dropdownList.id = 'dropdown-list';
                dropdownList.classList.add('dropdown-list');
                dropdownList.style.display = 'none';
                dropdownList.style.position = 'absolute';
                dropdownList.style.backgroundColor = '#fff';
                dropdownList.style.border = '1px solid #ccc';
                dropdownList.style.listStyle = 'none';
                dropdownList.style.padding = '0';
                dropdownList.style.margin = '0';
                dropdownContainer.appendChild(dropdownList);

                
                options.forEach(optionText => {
                  const optionItem = document.createElement('li');
                  optionItem.textContent = optionText;
                  optionItem.style.padding = '10px 20px';
                  optionItem.style.cursor = 'pointer';
                  dropdownList.appendChild(optionItem);
              
                  optionItem.addEventListener('click', function() {
                    dropdownButton.textContent = optionText;
                    dropdownList.style.display = 'none';
                    const apiresponse = {"Domain":"https://yogendrapawar.online/","Phrases":[{"PhraseHash":"ead164f91f600f8140bf89c4112ace88","PhraseKey":"Welcome to Our Website","Phrase":"欢迎访问我们的网站","PhraseDetails":[{"UrlPath":"https://www.simplylocalize.com/home","XPath":"//html[1]//body[2]//header[1]//h1[1]"}]},{"PhraseHash":"8a0bc2895a6f8bf291123745b215d0b1","PhraseKey":"© 2023 Company Name. All rights reserved.","Phrase":"© 2023 公司名称。保留所有权利。","PhraseDetails":[{"UrlPath":"https://www.simplylocalize.com/home","XPath":"/html[1]/body[2]/footer[3]/p[1]"}]},
                    {"PhraseHash":"ee87f95cc23bb98dba331a9767cab790","PhraseKey":"Capitalize Selected Text","Phrase":"大写所选文本","PhraseDetails":[{"UrlPath":"https://www.simplylocalize.com/home","XPath":"/html[1]/body[2]/button[4]"}]}]}
                    applyTranslations(apiresponse);
                    
                  });
                });

                dropdownButton.addEventListener('click', function() {
                  if (dropdownList.style.display === 'block') {
                    dropdownList.style.display = 'none';
                  } else {
                    dropdownList.style.display = 'block';
                  }
                });

                document.addEventListener('click', function(event) {
                  if (!dropdownButton.contains(event.target)) {
                    dropdownList.style.display = 'none';
                  }
                });
            
        }
        
    })
    .catch(error => {
        console.error('API Validation Error:', error);
    });

  });