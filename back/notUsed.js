// 참가 신청자 리스트 (커서 O)
// getUpdatedParticipantsByCursor: async postId => {
//     try {
//         const { rows: participants } = await db.Participant.findAndCountAll({
//             attributes: [
//                 [db.sequelize.literal('IFNULL(matchings.matching, 0)'), 'matching'],
//                 'user_Id',
//                 [
//                     db.sequelize.literal(`CONCAT(LPAD(IFNULL(matchings.matching, 0), 6, '0'), LPAD(pt.user_id, 6, '0'))`),
//                     'cursor',
//                 ],
//             ],
//             where: { post_Id: postId },
//             as: 'pt',
//             include: [
//                 {
//                     model: db.User,
//                     include: [
//                         {
//                             model: db.UserTag,
//                             as: 'UserTag',
//                             where: { tag_category_id: 2 },
//                             include: [
//                                 {
//                                     model: db.Tag,
//                                     attributes: [],
//                                     where: db.sequelize.col('UserTag.tagName'),
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             ],
//             order: [
//                 [db.sequelize.literal('matching'), 'DESC'],
//                 ['user_Id', 'DESC'],
//             ],
//             raw: true,
//             nest: true,
//             includeIgnoreAttributes: false,
//             subQuery: false,
//         });
//         console.log(participants);
//         return participants;
//     } catch (e) {
//         console.log(e);
//     }
// },

// matchingCount 수정
// updateMatchingCount: async ({ participantId, matchingCount }) => {
//     await db.Participant.update({ matchingCount }, { where: { participantId } });
// },
