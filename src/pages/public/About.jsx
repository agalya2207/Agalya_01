import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Lightbulb, Rocket } from 'lucide-react';
import PropTypes from 'prop-types';
import profilePhoto from '../../assets/profile-photo.png';

const HL = ({ children }) => (
  <span className="highlight-keyword" style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>{children}</span>
);

HL.propTypes = {
  children: PropTypes.node.isRequired,
};

const About = () => {
  const location = useLocation();

  // Scroll to hash after mount
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.substring(1));
      if (el) {
        const yOffset = -100;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="fade-in" style={{ padding: '40px 0', display: 'flex', flexDirection: 'column', gap: '60px' }}>
      {/* Intro – Two‑column layout: Text Left, Photo Right */}
      <section className="about-two-column">
        <style>{`
          .about-two-column {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 60px;
            flex-wrap: wrap;
            min-height: 70vh;
          }

          /* LEFT – Text content */
          .about-left-text {
            flex: 1 1 50%;
            min-width: 320px;
            max-width: 600px;
          }

          /* RIGHT – Photo */
          .about-right-photo {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* Heading – handwritten / sketch style */
          .about-heading-sketch {
            font-family: 'Kalam', 'Patrick Hand', 'Caveat', cursive;
            font-size: 2.8rem;
            font-weight: 700;
            color: #ffffff;
            margin: 0 0 8px 0;
            letter-spacing: 0.04em;
            line-height: 1.2;
          }

          .about-heading-underline {
            width: 60px;
            height: 3px;
            background: var(--color-primary);
            border-radius: 2px;
            margin-bottom: 28px;
          }

          /* Bio paragraphs */
          .about-bio {
            color: var(--color-text-muted);
            font-size: 1.02rem;
            line-height: 1.75;
            margin: 0 0 20px 0;
          }

          .highlight-keyword {
            color: var(--color-secondary) !important;
          }

          /* Icon + text rows */
          .about-icon-row {
            display: flex;
            align-items: flex-start;
            gap: 14px;
            margin-top: 20px;
          }
          .about-icon-row svg {
            flex-shrink: 0;
            color: var(--color-primary);
            margin-top: 3px;
          }
          .about-icon-row p {
            margin: 0;
            color: var(--color-text-muted);
            font-size: 1.02rem;
            line-height: 1.75;
          }

          .about-photo {
            width: 400px;
            height: 480px;
            object-fit: cover;
            display: block;
          }

          /* Responsive */
          @media (max-width: 900px) {
            .about-two-column {
              flex-direction: column;
              gap: 40px;
            }
            .about-left-text {
              max-width: 100%;
              order: 2;
            }
            .about-right-photo {
              order: 1;
            }
            .about-photo {
              width: 300px;
              height: 380px;
            }
          }
        `}</style>

        {/* LEFT – Text */}
        <div className="about-left-text">
          <h1 className="about-heading-sketch">ABOUT ME</h1>
          <div className="about-heading-underline" />

          <p className="about-bio">
            Hey, I{"'"}m <HL>Agalya</HL> — a B.Tech AI & Data Science student and <HL>full-stack</HL> developer
            passionate about <HL>software architecture</HL>, <HL>API design</HL>, <HL>database modeling</HL>,
            and modern <HL>UI development</HL>. Working with <HL>React</HL>, <HL>Python</HL>, <HL>JavaScript</HL>,
            and <HL>SQL</HL>, I build performant, maintainable platforms designed for real-world
            reliability, not just classroom demos.
          </p>

          <div className="about-icon-row">
            <Lightbulb size={22} />
            <p>
              My approach blends <HL>curiosity</HL> with <HL>problem-solving</HL>; breaking down complex
              requirements, designing the <HL>right architecture</HL>, and turning ideas into systems
              that <HL>actually work</HL>. I{"'"}m constantly exploring new <HL>tools</HL> and <HL>techniques</HL>,
              treating every project as a chance to <HL>grow sharper</HL> as a developer.
            </p>
          </div>

          <div className="about-icon-row">
            <Rocket size={22} />
            <p>
              I{"'"}m not just learning to code —<br />
              I{"'"}m learning to build <HL>things that matter</HL>.
            </p>
          </div>
        </div>

        {/* RIGHT – Photo */}
        <div className="about-right-photo">
          <img src={profilePhoto} alt="Agalya – Profile Photo" className="about-photo" />
        </div>
      </section>
    </div>
  );
};

export default About;
