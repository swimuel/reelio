// controller files should contain the actual functions to be executed when certain api endpoints receive requests.

// the model can be used to interact with the database entities
const nodemailer = require('nodemailer')
const config = require('../../config')
const Campaigns = require('./campaign')
const ScreenType = require('../screenType/screenType')
const moment = require('moment')

// create transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.reelioEmailUsername,
    pass: config.reelioEmailPassword
  }
})

const getAllCampaigns = async (req, res) => {
  const campaignList = await Campaigns.find()

  // async map functions are weird so have to use promise.all to properly await
  let dtoList = await Promise.all(campaignList.map(async campaign => {
    const dto = campaign.toObject()
    dto.percentageComplete = await campaign.calculatePercentageComplete()
    dto.campaignFinishDate = await campaign.calculateCampaignTimeRemainingInDays()
    dto.screenType = await (await ScreenType.findById(dto.screenType)).calculateDisplayName()
    dto.seatsLeft = await campaign.calculateRemainingSeats()
    return dto
  }))
  dtoList = dtoList.filter(campaign => campaign.screeningDate > moment() && campaign.seatsLeft > 0)
  dtoList.sort((a, b) => {
    return a.screeningDate - b.screeningDate
  })
  res.json(dtoList)
}

const getCampaignById = async (req, res) => {
  const { id } = req.params
  const campaign = await Campaigns.findById(id)
  const dto = campaign.toObject()
  dto.screenType = await (await ScreenType.findById(dto.screenType)).calculateDisplayName()
  dto.seatsLeft = await campaign.calculateRemainingSeats()
  res.json(dto)
}

const newCampaign = async (req, res) => {
  const campaign = new Campaigns()

  campaign.filmTitle = req.body.filmTitle
  campaign.campaignTitle = req.body.campaignTitle
  campaign.creationDate = moment()
  campaign.imageUrl = req.body.imageUrl
  campaign.genre = req.body.genre.split(',')
  campaign.creatorName = req.body.creatorName
  campaign.creatorEmail = req.body.creatorEmail
  campaign.cinemaName = req.body.cinemaName
  campaign.cinemaAddress = req.body.cinemaAddress
  campaign.imdbID = req.body.imdbID
  campaign.screeningTime = req.body.screeningTime
  campaign.rated = req.body.rated

  // try making a Date object form supplied data. If for some reason its invalid then return
  try {
    campaign.screeningDate = Date.parse(req.body.screeningDate)
  } catch (err) {
    res.status(400).json({ error: err })
    return
  }

  // Check that the screen type is in DB and populate price field
  try {
    const screenTypeEntry = await ScreenType.findById(req.body.screenType)
    campaign.screenType = screenTypeEntry._id
    campaign.adultPrice = screenTypeEntry.adultPrice
    campaign.childPrice = screenTypeEntry.childPrice
  } catch (err) {
    res.status(404).json({ error: 'Screen Type not found for ' + req.body.screenType })
    return
  }

  // save the contact and check for errors
  campaign.save(function (err, result) {
    if (err) {
      res.status(400).json(err)
    } else {
      res.status(201).json({ data: campaign })
    }
  })

  // whitelist test@test.com emai
  if (campaign.creatorEmail !== 'test@test.com') {
    var username = campaign.creatorName
    var movieTitle = campaign.filmTitle
    var campaignLink = 'http://localhost:3000/campaigns/' + campaign._id

    // format template string for personalised email
    const messageHtml = `<!doctype html> <html> <head> <meta name="viewport" content="width=device-width" /> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> <title>Simple Transactional Email</title> <style> /* ------------------------------------- GLOBAL RESETS ------------------------------------- */ /*All the styling goes here*/ img { border: none; -ms-interpolation-mode: bicubic; max-width: 100%; } body { background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; } table { border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; } table td { font-family: sans-serif; font-size: 14px; vertical-align: top; } /* ------------------------------------- BODY & CONTAINER ------------------------------------- */ .body { background-color: #f6f6f6; width: 100%; } /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */ .container { display: block; margin: 0 auto !important; /* makes it centered */ max-width: 580px; padding: 10px; width: 580px; } /* This should also be a block element, so that it will fill 100% of the .container */ .content { box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px; } /* ------------------------------------- HEADER, FOOTER, MAIN ------------------------------------- */ .main { background: #ffffff; border-radius: 3px; width: 100%; } .wrapper { box-sizing: border-box; padding: 20px; } .content-block { padding-bottom: 10px; padding-top: 10px; } .footer { clear: both; margin-top: 10px; text-align: center; width: 100%; } .footer td, .footer p, .footer span, .footer a { color: #999999; font-size: 12px; text-align: center; } /* ------------------------------------- TYPOGRAPHY ------------------------------------- */ h1, h2, h3, h4 { color: #000000; font-family: sans-serif; font-weight: 400; line-height: 1.4; margin: 0; margin-bottom: 30px; } h1 { font-size: 35px; font-weight: 300; text-align: center; text-transform: capitalize; } p, ul, ol { font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px; } p li, ul li, ol li { list-style-position: inside; margin-left: 5px; } a { color: #3498db; text-decoration: underline; } /* ------------------------------------- BUTTONS ------------------------------------- */ .btn { box-sizing: border-box; width: 100%; } .btn > tbody > tr > td { padding-bottom: 15px; } .btn table { width: auto; } .btn table td { background-color: #ffffff; border-radius: 5px; text-align: center; } .btn a { background-color: #ffffff; border: solid 1px #ff6852; border-radius: 5px; box-sizing: border-box; color: #ff6852; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; } .btn-primary table td { background-color: #ff6852; } .btn-primary a { background-color: #ff6852; border-color: #ff6852; color: #ffffff; } /* ------------------------------------- OTHER STYLES THAT MIGHT BE USEFUL ------------------------------------- */ .last { margin-bottom: 0; } .first { margin-top: 0; } .align-center { text-align: center; } .align-right { text-align: right; } .align-left { text-align: left; } .clear { clear: both; } .mt0 { margin-top: 0; } .mb0 { margin-bottom: 0; } .preheader { color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0; } .powered-by a { text-decoration: none; } hr { border: 0; border-bottom: 1px solid #f6f6f6; margin: 20px 0; } /* ------------------------------------- RESPONSIVE AND MOBILE FRIENDLY STYLES ------------------------------------- */ @media only screen and (max-width: 620px) { table[class=body] h1 { font-size: 28px !important; margin-bottom: 10px !important; } table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a { font-size: 16px !important; } table[class=body] .wrapper, table[class=body] .article { padding: 10px !important; } table[class=body] .content { padding: 0 !important; } table[class=body] .container { padding: 0 !important; width: 100% !important; } table[class=body] .main { border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important; } table[class=body] .btn table { width: 100% !important; } table[class=body] .btn a { width: 100% !important; } table[class=body] .img-responsive { height: auto !important; max-width: 100% !important; width: auto !important; } } /* ------------------------------------- PRESERVE THESE STYLES IN THE HEAD ------------------------------------- */ @media all { .ExternalClass { width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } .apple-link a { color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important; } #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; } .btn-primary table td:hover { background-color: #34495e !important; } .btn-primary a:hover { background-color: #34495e !important; border-color: #34495e !important; } } </style> </head> <body class=""> <span class="preheader">Reelio Movie Campaign</span> <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body"> <tr> <td>&nbsp;</td> <td class="container"> <div class="content"> <!-- START CENTERED WHITE CONTAINER --> <table role="presentation" class="main"> <!-- START MAIN CONTENT AREA --> <tr> <td class="wrapper"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td> <p>Hi ${username},</p> <p>Congratulations on making a movie campaign with Reelio! We're proud to be able to help you with your campaign for '${movieTitle}' - check out the link below to share it with your friends, and remind them of the details.</p> <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary"> <tbody> <tr> <td align="left"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tbody> <tr> <td> <a href="${campaignLink}" target="_blank">Take me to my campaign!</a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <p>Remember you need a certain number of people for your campaign to succeed, and be shown in theatres.</p> <p>Good luck, and happy film watching!</p> </td> </tr> </table> </td> </tr> <!-- END MAIN CONTENT AREA --> </table> <!-- END CENTERED WHITE CONTAINER --> <!-- START FOOTER --> <div class="footer"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td class="content-block"> <span class="apple-link">Sutherland Building, Vista Road, Auckland, 1025</span> <br> Don't like these emails? <a href="http://i.imgur.com/CScmqnj.gif">Unsubscribe</a>. </td> </tr> <tr> <td class="content-block powered-by"> Powered by <a href="http://htmlemail.io">Reelio</a>. </td> </tr> </table> </div> <!-- END FOOTER --> </div> </td> <td>&nbsp;</td> </tr> </table> </body> </html>`

    const mailOptions = {
      from: config.reelioEmailUsername, // sender address
      to: campaign.creatorEmail, // list of receivers
      subject: 'Reelio Campaign Creation', // Subject line
      html: messageHtml // plain text body
    }

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) { console.log(err) } else { console.log(info) }
    })
  }
}

module.exports = {
  getAllCampaigns,
  getCampaignById,
  newCampaign
}
