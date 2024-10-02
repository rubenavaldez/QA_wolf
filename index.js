// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  let articleCount=0
  let newestDate= 1827834361000
  let textDate = ""


  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");
  
  await page.click("text=show")
  
 
  
  for(let i = 0; i<4; i++){
    

    let subLines = await page.$$(".subText")
      
      for(let j = 0; j < subLines.length; j++){
          articleCount++
          if (articleCount > 100){
            return true
          }
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
            await browser.close()
            return false 
          }

      }

  


    
    const isMore = await page.$(".moreLink")

    if(isMore){

      await page.click(".morelink")
    }else{
       return true // break loop
    }

  }
  
  return true
}

(async () => {
  const result = await sortHackerNewsArticles();
  
  console.log(`Evaluation completed. Articles in proper date order: ${result}`);

})();
