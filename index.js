const puppeteer = require("puppeteer");
const Standings = require("./scrapers/standings");
const Email = require("./utils/email");

/**
 * Run Standings
 */
(async () => {
  let browser;
  let page;

  try {
    browser = await puppeteer.launch({
      headless: false,
      args: [
        "--start-maximized", // you can also use '--start-fullscreen'
      ],
    });

    page = await browser.newPage();
   await page.setViewport({ width: 1300, height: 800 });
    const standings = await new Standings(browser, page).main();

    // Make sure to uncomment the email code if you want to test out the email functionality.
    // Just remember to add your e-mail credentials in utils/email first.

    // await Email.send(
    //   `<ul style="list-style:none;">
    //     ${standings.map(
    //       ([team, points], i) => `<li>${i + 1}: ${team} ${points}</li>`
    //     )}
    //   </ul>`.replace(/\,/g, "")
    // );
  } catch (error) {
    // await Email.send(error.stack, true);
  }
  await page.waitFor(3000);
  await browser.close();
})();
