import ExternalLink from '../components/ExternalLink.jsx'
import { FileIcon, MailIcon } from '../components/icons.jsx'
import ProfileViz from '../components/viz/ProfileViz.jsx'
import { EMAIL, HEADSHOT_URL, RESUME_URL } from '../data/site.js'

export default function Profile() {
  return (
    <div className="profile-page">
      <ProfileViz />
      <div className="profile-content-grid">
        <div className="profile-photo-col">
          <img className="profile-photo" src={HEADSHOT_URL} alt="Bridget Crampton" />
          <a className="profile-pill profile-pill-solid" href={`mailto:${EMAIL}`}>
            <MailIcon />
            {EMAIL}
          </a>
          <ExternalLink className="profile-pill profile-pill-outline" href={RESUME_URL}>
            <FileIcon />
            resume.pdf
          </ExternalLink>
        </div>

        <div className="profile-text-block">
          <div className="profile-hello">HELLO!</div>
          <div className="profile-inam">
            I&apos;M <span>BRIDGET.</span>
          </div>
          <div className="profile-role">Data Scientist · Analyst · Engineer</div>
          <div className="profile-bio">
            <p>
              Hi, I&apos;m Bridget. I&apos;m a data science student at Northeastern. I believe data
              is one of the most powerful tools we have for understanding the world and making it
              better for the people in it. I build with intention and I want people to feel the
              impact of what I make.
            </p>
            <p>
              Right now I&apos;m building my foundation through real estate analysis, machine
              learning, and business intelligence work at Klaviyo.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
