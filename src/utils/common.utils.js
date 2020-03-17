import { getLocale } from 'umi-plugin-react/locale';
import { getRosMessage } from '@/utils/authority';

module.exports = {

  getRosMessageByCode(data) {
    const lang = getLocale() || 'en-US';
    const messageList = getRosMessage();
    const code = data.code;
    const message = messageList ? (messageList[code] ? messageList[code][lang] : '') : '';
    if(message) {
      return {
        message,
        description:`${message}(${data.code})`
      }
    }
    return {
        message: `${data.msg}(${data.code})`,
        description: '',
    }
  }
}
