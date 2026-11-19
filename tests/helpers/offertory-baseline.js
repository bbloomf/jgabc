const baseline=require('../fixtures/offertory/proofread-baseline.json').chants;
const {verseReviewStatus}=require('../../download-offertory-verses');
function reviewedStatus(entry,parsed){
  const current=baseline[entry.id];
  return verseReviewStatus(current?{...entry,review:'verified',verseReview:{sha256:current.verseSha256}}:entry,parsed);
}
module.exports={baseline,reviewedStatus};
