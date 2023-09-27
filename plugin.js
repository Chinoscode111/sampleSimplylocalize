// import { API } from "./api.js"

// const validateData = {
//     InstantApiKey: "ENCjRrj71t4Ce1aVQnbL1to5OeqPmjzwuGNA",
//     Domain : "https://yogendrapawar.online/",

//     // InstantApiKey: "9BWsx87ITaDle3yBQeXmi9W8OlceGnrRThSM",
//     // Domain : "https://chinoscode111.github.io/test/"
// }

// const parsePage = (element, parentPath = []) => {
//   const textNodes = [];

//   const commonHtmlTags = [
//     'DIV', 'SECTION', 'ARTICLE', 'HEADER', 'FOOTER',
//     'NAV', 'ASIDE', 'MAIN', 'FIGURE', 'FIGCAPTION',
//     'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
//     'UL', 'OL', 'LI', 'A', 'SPAN', 'STRONG', 'EM',
//     'IMG', 'TABLE', 'TR', 'TD', 'TH',
//     'FORM', 'INPUT', 'BUTTON', 'TEXTAREA', 'LABEL',
//     'SELECT', 'OPTION', 'BLOCKQUOTE', 'CITE', 'CODE', 'PRE', 'ABBR', 'ADDRESS', 'B', 'I', 'U', 'DEL',
//     'INS', 'MARK', 'SMALL', 'SUB', 'SUP', 'TIME', 'S', 'KBD', 'SAMP', 'VAR',
//     'BDO', 'Q', 'HR', 'RUBY', 'RT', 'RP', 'DETAILS', 'SUMMARY', 'METER',
//     'PROGRESS', 'CANVAS', 'IFRAME', 'VIDEO', 'AUDIO', 'SOURCE', 'TRACK', 'EMBED',
//     'OBJECT', 'PARAM', 'TBODY', 'MAIN' , 'HGROUP'
//   ];

//   const traverse = (element, path) => {
//     const children = element.childNodes;

//     children.forEach((child, index) => {
//       if (child.nodeType === Node.TEXT_NODE) {
//         const text = child.textContent.trim();
//         if (text) {
//           const nodePath = [...path, index];
//           textNodes.push({ text, path: nodePath, node: child.parentElement });
//         }
//       } else if (child.nodeType === Node.ELEMENT_NODE) {
//         if (commonHtmlTags.some(tagName => tagName === child.tagName && child.tagName !== 'NON-TRANSLATE')) {
//           if (child.tagName === 'INPUT' || child.tagName === 'TEXTAREA') {
//             const placeholder = child.getAttribute('placeholder');
//             if (placeholder) {
//               textNodes.push({ text: placeholder, path: [...path, index], node: child });
//             }
//           } else {
//             traverse(child, [...path, index]);
//           }
//         }
//       }
//     });
//   };

//   traverse(element, parentPath);
//   console.log(textNodes);

//   function collectElementXPaths(node, currentPath) {

//     const children = node.childNodes;
    
//     if (node.nodeType === Node.ELEMENT_NODE) {
//       currentPath += '/' + node.tagName.toLowerCase();
//       const index = Array.from(node.parentNode.childNodes).filter(e => e.tagName === node.tagName).indexOf(node) + 1;
//       currentPath += '[' + index + ']';
//       children.forEach((child) => {
//       if (child.nodeType === Node.TEXT_NODE) {
//         const text = child.textContent.trim();
//         if (textNodes.some(item => item.text === text && text.length > 0)) {
//           const index = textNodes.findIndex(item => item.text === text);
//           textNodes[index].path = currentPath;
//         }
//       }
//     })

//       for (let i = 0; i < node.childNodes.length; i++) {
//         collectElementXPaths(node.childNodes[i], currentPath);
//       }
//     }
//   }

//   collectElementXPaths(document.body, '');

//   return textNodes;
// };


// const parsedData = parsePage(document.body);

// const convertedData =  {
//   "ApiKey": "ENCjRrj71t4Ce1aVQnbL1to5OeqPmjzwuGNA",
//   "DomainName": "https://www.simplylocalize.com",
//   "URL": "https://www.simplylocalize.com/home",
//   "InstantPhraseList": parsedData.map(item => ({
//     "Phrase": item.text,
//     "UrlPath": "https://www.simplylocalize.com/home", //ask this in meet
//     "XPath": item.xpath
//   }))
// };



// let addphrasedata = convertedData

// const addPhrase = (addphrasedata) => {
//   API.addphrase({ addphrasedata:  addphrasedata})
//     .then(response => {
//         if (response.ok) {
//             return response.json();
//         } else {
//             throw new Error('Invalid API');
//         }
//     })
//     .then(data => {
//         console.log('API Validation Response:', data);
//     })
//     .catch(error => {
//         console.error('API Validation Error:', error);
//     });


// }
// // addPhrase(addphrasedata);


// const applyTranslations = (Phrases) => {
//        Phrases.forEach((phraseInfo) => {
        
//         const xpath = phraseInfo.PhraseDetails[0].XPath;
        
//         const translatedText = phraseInfo.Phrase;
//         const xpathResult = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
//         const element = xpathResult.singleNodeValue;
//         if (element) {
//           if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
//             element.setAttribute('placeholder', translatedText);
//           } else {
//             element.textContent = translatedText;
//           }
//         }
//       }); 
// };  

// let apiData;

// // document.addEventListener('DOMContentLoaded', () => {
// // API.validateAPI({ validatedata: validateData })
// //     .then(response => {
// //         if (response.ok) {
// //             return response.json();
// //         } else {
// //             throw new Error('Invalid API');
// //         }
// //     })
// //     .then(data => {
// //          apiData = data;
// //          processApiData(apiData);
// //          const details = apiData.data.filePathDetails
// //         details.forEach(element => {
// //           let file = element.filePath;
// //            fetch(file)
// //            .then(response => response.json())
// //            .then(data => {
// //               localStorage.setItem(`${element.language}`, data.Phrases)
// //            })
// //          .catch(error => {
// //            console.error('Error fetching/parsing JSON:', error);
// //          });

// //         })
// //          console.log(details[0]);
       
// //     })
// //     .catch(error => {
// //         console.error('API Validation Error:', error);
// //     });
// //   });


// function processApiData(apiData) {
//   // console.log(apiData);
//   const isValidate = apiData.data.isValidate;
//   const details = apiData.data.filePathDetails
//   const options = details.map(item => item.language)   
//         if (isValidate){
          
          
//               const body = document.body;

//               const dropdownContainer = document.createElement('div');
//               dropdownContainer.classList.add('dropdown');
//               dropdownContainer.style.position = 'fixed';
//               dropdownContainer.style.top = '10px';
//               dropdownContainer.style.right = '10px';
//               body.appendChild(dropdownContainer);

//               const dropdownButton = document.createElement('button');
//               dropdownButton.textContent = 'Select an option';
//               dropdownButton.id = 'dropdown-btn';
//               dropdownButton.style.padding = '10px 20px';
//               dropdownButton.style.backgroundColor = '#f0f0f0';
//               dropdownButton.style.border = '2px';
//               dropdownButton.style.cursor = 'pointer';
//               dropdownContainer.appendChild(dropdownButton);

//               const dropdownList = document.createElement('ul');
//               dropdownList.id = 'dropdown-list';
//               dropdownList.classList.add('dropdown-list');
//               dropdownList.style.display = 'none';
//               dropdownList.style.position = 'absolute';
//               dropdownList.style.backgroundColor = '#fff';
//               dropdownList.style.border = '1px solid #ccc';
//               dropdownList.style.listStyle = 'none';
//               dropdownList.style.padding = '0';
//               dropdownList.style.margin = '0';
//               dropdownContainer.appendChild(dropdownList);

              
//               options.forEach(optionText => {
//                 const optionItem = document.createElement('li');
//                 optionItem.textContent = optionText;
//                 optionItem.style.padding = '10px 20px';
//                 optionItem.style.cursor = 'pointer';
//                 dropdownList.appendChild(optionItem);
            
//                 optionItem.addEventListener('click', function() {
//                   dropdownButton.textContent = optionText;
//                   dropdownList.style.display = 'none';
//                   // const apiresponse = {"Domain":"https://yogendrapawar.online/","Phrases":[{"PhraseHash":"ead164f91f600f8140bf89c4112ace88","PhraseKey":"Welcome to Our Website","Phrase":"欢迎访问我们的网站","PhraseDetails":[{"UrlPath":"https://www.simplylocalize.com/home","XPath":"//html[1]//body/header/h1"}]},{"PhraseHash":"8a0bc2895a6f8bf291123745b215d0b1","PhraseKey":"© 2023 Company Name. All rights reserved.","Phrase":"© 2023 公司名称。保留所有权利。","PhraseDetails":[{"UrlPath":"https://www.simplylocalize.com/home","XPath":"/html[1]/body[2]/footer[3]/p[1]"}]},
//                   // {"PhraseHash":"ee87f95cc23bb98dba331a9767cab790","PhraseKey":"Capitalize Selected Text","Phrase":"大写所选文本","PhraseDetails":[{"UrlPath":"https://www.simplylocalize.com/home","XPath":"/html[1]/body[1]/button[2]"}]}]}
//                   const phrases = localStorage.getItem(`${optionText}`)
//                   applyTranslations(phrases);
                  
//                 });
//               });

//               dropdownButton.addEventListener('click', function() {
//                 if (dropdownList.style.display === 'block') {
//                   dropdownList.style.display = 'none';
//                 } else {
//                   dropdownList.style.display = 'block';
//                 }
//               });

//               document.addEventListener('click', function(event) {
//                 if (!dropdownButton.contains(event.target)) {
//                   dropdownList.style.display = 'none';
//                 }
//               });
          
//       }
// }

import { API } from "./api.js"

const validateData = {
    InstantApiKey: "ENCjRrj71t4Ce1aVQnbL1to5OeqPmjzwuGNA",
    Domain : "https://yogendrapawar.online/",

    // InstantApiKey: "9BWsx87ITaDle3yBQeXmi9W8OlceGnrRThSM",
    // Domain : "https://chinoscode111.github.io/test/"
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

  const traverse = (element, currentPath) => {
    const children = element.childNodes;

    children.forEach((child, index) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent.trim();
        if (text) {
          const nodePath = currentPath;
          textNodes.push({ text, path: nodePath, node: child.parentElement});
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        if (commonHtmlTags.some(tagName => tagName === child.tagName && child.className !== 'non-translate')) {
            currentPath += '/' + child.tagName.toLowerCase();
            const Index = Array.from(child.parentNode.childNodes).filter(e => e.tagName === child.tagName).indexOf(child) + 1;
            currentPath += '[' + Index + ']';
          if (child.tagName === 'INPUT' || child.tagName === 'TEXTAREA') {
            const placeholder = child.getAttribute('placeholder');
            if (placeholder) {
              textNodes.push({ text: placeholder, path: currentPath, node: child });
            }
          } else {
            traverse(child, currentPath);
          }
        }
      }
    });
  };

  console.log(textNodes)
  traverse(element, parentPath);
  return textNodes;
};


const parsedData = parsePage(document.body);

const convertedData =  {
  "ApiKey": "ENCjRrj71t4Ce1aVQnbL1to5OeqPmjzwuGNA",
  "DomainName": "https://www.simplylocalize.com",
  "URL": "https://www.simplylocalize.com/home",
  "InstantPhraseList": parsedData.map(item => ({
    "Phrase": item.text,
    "UrlPath": "https://www.simplylocalize.com/home", //ask this in meet
    "XPath": item.path
  }))
};



let addphrasedata = convertedData
console.log(addphrasedata)
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


const applyTranslations = (Phrases) => {
       Phrases.forEach((phraseInfo) => {
        
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
};  

let apiData;

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
         apiData = data;
        console.log(apiData)
         processApiData(apiData);
         //const details = apiData.data.filePathDetails
        // details.forEach(element => {
        //   let file = element.filePath;
        //    fetch(file)
        //    .then(response => response.json())
        //    .then(data => {
        //       localStorage.setItem(`${element.language}`, data.Phrases)
        //    })
        //  .catch(error => {
        //    console.error('Error fetching/parsing JSON:', error);
        //  });

        // })
        //  console.log(details[0]);
       
    })
    .catch(error => {
        console.error('API Validation Error:', error);
    });
  });


function processApiData(apiData) {
  // console.log(apiData);
  const isValidate = apiData.data.isValidate;
  const details = apiData.data.filePathDetails
  const options = details.map(item => item.language)
  
  details.forEach(item => {
    const update = localStorage.getItem(`${item.language}`);
    if(update !== item.lastUpdated){
    getTranslations(item.languageId , item.language)
    localStorage.setItem(`${item.language}`, item.lastUpdated)
    }
    localStorage.setItem(`${item.language}`, item.lastUpdated)
  }) 
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
                  const phrases = localStorage.getItem(`${optionText}`)
                  applyTranslations(phrases);
                  
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
}




const getTranslations = (langId , lang) => {

  translationdata = {
    "ApiKey": "ENCjRrj71t4Ce1aVQnbL1to5OeqPmjzwuGNA",
    "DomainName" : "https://yogendrapawar.online/",
    "LanguageId":`${langId}`
  }
  
  API.gettranslations({gettranslationdata : translationdata})
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Invalid API');
        }
    })
    .then(data => {
      //const details = data.data.filePathDetails
    //  details.forEach(element => {
       // let file = element.filePath;
       //  fetch(file)
       //  .then(response => response.json())
        // .then(data => {
            localStorage.setItem(`${lang}`, data.Phrases)
       //  })
      //  .catch(error => {
      //    console.error('Error fetching/parsing JSON:', error);
      //  });

      })
   // })
    .catch(error => {
        console.error('API Validation Error:', error);
    });


}


