// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
 
  let newestDate= 1827834361000
  let textDate = ""


  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");
  
  await page.click("text=show")
  
 
  
  for(let i = 0; i<4; i++){
    

    let subLines = await page.$$(".subText")
      
      for(let j = 0; j < subLines.length; j++){
          let sub = subLines[j]
          let ageElem = await sub.$(".age")
                   
          let date = await ageElem.getAttribute("title") 
          let unixTimeStamp = Date.parse(date)

     

          let anchor = await ageElem.$("a")
          let text = await anchor.textContent()

          if( newestDate > unixTimeStamp){
            console.log("Older article", newestDate , unixTimeStamp , textDate , text)
            newestDate = unixTimeStamp
            textDate = text
          }else{
            console.error("out of order", newestDate, unixTimeStamp , textDate , text)

            return false 
          }

      }

  


    
    const isMore = await page.$(".moreLink")

    if(isMore){

      await page.click(".morelink")
    }else{
       i = 5
    }

  }
  
  return true
}

(async () => {
  await sortHackerNewsArticles();
})();
