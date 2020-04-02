
import { common_avatar_url, common_file_url } from '@/utils/api.prefix';

module.exports = {

  getAvatar(author) {
    if(author.useDefaultAvatarUrl) {
      return common_avatar_url + author.avatarUrl;
    } else {
      return common_file_url + '/' + author.avatarUrl;
    }
  }
}
