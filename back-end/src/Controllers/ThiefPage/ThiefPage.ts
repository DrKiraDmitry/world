import pup from "puppeteer";

export const getThiefPage = async (req: any, res: any) => {
  const { link, articleTag } = req.body;
  const browser = await pup.launch();
  const page = await browser.newPage();
  await page.goto(link);
  await page.waitForSelector(articleTag);
  const content = await page.$eval(articleTag, (r) => r.innerText);
  res.status(200).json(content);
};
