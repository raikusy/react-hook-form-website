import * as React from "react"
import { navigate } from "@reach/router"
import Form from "./Form"
import Header from "./Header"
import Watcher from "./Watcher"
import CodeCompareSection from "./CodeCompareSection"
import CodePerfCompareSection from "./CodePerfCompareSection"
import IsolateRender from "./IsolateRender"
import FooterContent from "./Footer"
import Builder from "./BuilderPage"
import FeaturesList from "./FeaturesList"
import { useStateMachine } from "little-state-machine"
import home from "../data/home"
import translateLink from "./logic/translateLink"
import typographyStyles from "../styles/typography.module.css"
import containerStyles from "../styles/container.module.css"
import buttonStyles from "../styles/button.module.css"
import styles from "./HomePage.module.css"

const { useState, useRef, useEffect } = React

const options = {
  rootMargin: "0px 0px",
  threshold: [1],
}

function HomePage({
  location,
  defaultLang,
}: {
  location: {
    search: string
    pathname: string
  }
  defaultLang: string
}) {
  const [submitData, updateSubmitData] = useState({})
  const [showBuilder, toggleBuilder] = useState(false)
  const HomeRef = useRef(null)
  const [isPlayFeature, setFeaturePlay] = useState(false)
  const [isPlayCodeCompare, setCodeComparePlay] = useState(false)
  const [isIsolatePlay, setIsolatePlay] = useState(false)
  // const [isCardPlay, setCardPlay] = useState(false)
  const [isPlayRender, setRenderPlay] = useState(false)
  const [formUpdated, setFormUpdated] = useState(false)
  const [isPlayWatch, setWatchPlay] = useState(false)
  const {
    state,
    state: { language, setting = {} },
  } = useStateMachine()
  const lightMode = state?.setting?.lightMode
  const { currentLanguage } =
    language && language.currentLanguage
      ? language
      : { currentLanguage: defaultLang }

  const onSubmit = (data) => {
    updateSubmitData(data)
  }

  useEffect(() => {
    if (location.search.startsWith("?goToDemo")) {
      setTimeout(() => {
        HomeRef.current.scrollIntoView({ behavior: "smooth" })

        if (location.search.startsWith("?goToDemo&updated=true")) {
          setFormUpdated(true)
        }
      }, 100)
    }

    if (!IntersectionObserver) {
      setFeaturePlay(true)
      setCodeComparePlay(true)
    }

    const featureList = document.querySelector("#featureLast")
    const codeComparison = document.querySelector("#codeComparison")
    const rendering = document.querySelector("#rendering")
    const isolate = document.querySelector("#isolate")
    const watch = document.querySelector("#watch")
    // const card = document.querySelector("#card")

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === featureList && !isPlayFeature) {
            setFeaturePlay(true)
          }
          if (entry.target === codeComparison && !isPlayCodeCompare) {
            setCodeComparePlay(true)
          }
          if (entry.target === rendering && !isPlayRender) {
            setRenderPlay(true)
          }
          if (entry.target === isolate && !isIsolatePlay) {
            setIsolatePlay(true)
          }
          if (entry.target === watch && !isPlayWatch) {
            setWatchPlay(true)
          }
          // if (entry.target === card && !isCardPlay) {
          //   setCardPlay(true)
          // }
        }
      })
    }, options)

    observer.observe(featureList)
    observer.observe(codeComparison)
    observer.observe(rendering)
    observer.observe(isolate)
    observer.observe(watch)
    // observer.observe(card)

    return () => observer.disconnect()
  }, [])

  return (
    <div className={styles.root}>
      {showBuilder && (
        <Builder
          showBuilder
          toggleBuilder={toggleBuilder}
          HomeRef={HomeRef}
          defaultLang={defaultLang}
        />
      )}

      <Header
        // isCardPlay={isCardPlay}
        homeRef={HomeRef}
        defaultLang={defaultLang}
      />

      <FeaturesList
        isPlayFeature={isPlayFeature}
        currentLanguage={currentLanguage}
      />

      <CodeCompareSection
        isPlayCodeCompare={isPlayCodeCompare}
        currentLanguage={currentLanguage}
        setting={setting}
      />

      <IsolateRender
        isIsolatePlay={isIsolatePlay}
        currentLanguage={currentLanguage}
      />

      <div className={containerStyles.centerContent}>
        <svg fill={"white"} viewBox="0 0 512 512">
          <path d="M256 464c-114.69 0-208-93.31-208-208S141.31 48 256 48s208 93.31 208 208-93.31 208-208 208zm0-384c-97 0-176 79-176 176s79 176 176 176 176-78.95 176-176S353.05 80 256 80z" />
          <path d="M323.67 292c-17.4 0-34.21-7.72-47.34-21.73a83.76 83.76 0 01-22-51.32c-1.47-20.7 4.88-39.75 17.88-53.62S303.38 144 323.67 144c20.14 0 38.37 7.62 51.33 21.46s19.47 33 18 53.51a84 84 0 01-22 51.3C357.86 284.28 341.06 292 323.67 292zm55.81-74zM163.82 295.36c-29.76 0-55.93-27.51-58.33-61.33-1.23-17.32 4.15-33.33 15.17-45.08s26.22-18 43.15-18 32.12 6.44 43.07 18.14 16.5 27.82 15.25 45c-2.44 33.77-28.6 61.27-58.31 61.27zM420.37 355.28c-1.59-4.7-5.46-9.71-13.22-14.46-23.46-14.33-52.32-21.91-83.48-21.91-30.57 0-60.23 7.9-83.53 22.25-26.25 16.17-43.89 39.75-51 68.18-1.68 6.69-4.13 19.14-1.51 26.11a192.18 192.18 0 00232.75-80.17zM163.63 401.37c7.07-28.21 22.12-51.73 45.47-70.75a8 8 0 00-2.59-13.77c-12-3.83-25.7-5.88-42.69-5.88-23.82 0-49.11 6.45-68.14 18.17-5.4 3.33-10.7 4.61-14.78 5.75a192.84 192.84 0 0077.78 86.64l1.79-.14a102.82 102.82 0 013.16-20.02z" />
        </svg>
        <h1 className={typographyStyles.h1}>The Community</h1>

        <p className={typographyStyles.homeParagraph}>
          Build and driven by the community. On a mission to make every React
          developer's life easier when it come to build forms.
        </p>
      </div>

      <Watcher
        lightMode={lightMode}
        isPlayWatch={isPlayWatch}
        currentLanguage={currentLanguage}
      />

      <CodePerfCompareSection
        isPlayRender={isPlayRender}
        currentLanguage={currentLanguage}
      />

      <div ref={HomeRef} />

      <Form
        {...{
          onSubmit,
          submitData,
          toggleBuilder,
          formUpdated,
          currentLanguage,
        }}
      />

      <section className={containerStyles.centerContent}>
        <h1 className={typographyStyles.h1}>
          {home.findInteresting[currentLanguage].heading}
        </h1>
        {home.findInteresting[currentLanguage].description}
        <div
          className={buttonStyles.buttonsGroup}
          style={{
            maxWidth: 500,
          }}
        >
          <button
            className={buttonStyles.primaryButton}
            onClick={() => {
              navigate(translateLink("get-started", currentLanguage))
            }}
          >
            {home.getStarted[currentLanguage]}
          </button>
          <button
            className={buttonStyles.primaryButton}
            onClick={() => {
              navigate(translateLink("api", currentLanguage))
            }}
          >
            API
          </button>
        </div>
      </section>

      <FooterContent currentLanguage={currentLanguage} />
    </div>
  )
}

export default React.memo(HomePage)
