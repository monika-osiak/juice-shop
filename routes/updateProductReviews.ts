/*
 * Copyright (c) 2014-2021 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import utils = require('../lib/utils')
const challenges = require('../data/datacache').challenges
const db = require('../data/mongodb')
const security = require('../lib/insecurity')

// vuln-code-snippet start noSqlReviewsChallenge forgedReviewChallenge RESOLVED
module.exports = function productReviews () {
  return (req, res, next) => {
    const user = security.authenticatedUsers.from(req)

    if (typeof req.body.id !== 'string') {
      res.status(400).send()
      return
    }

    db.reviews.update(
      { _id: req.body.id },
      { $set: { message: req.body.message } }
    ).then(
      result => {
        res.json(result)
      }, err => {
        res.status(500).json(err)
      })
  }
}
// vuln-code-snippet end noSqlReviewsChallenge forgedReviewChallenge
