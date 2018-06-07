import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xdb27c2E7e79faEF83245a654FF5b979d297d6A02'
);

export default instance;
