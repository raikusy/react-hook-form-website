import * as React from "react"
import Seo from "../components/seo"
import Layout from "../components/layout"
import Footer from "../components/Footer"
import containerStyles from "../styles/container.module.css"
import typographyStyles from "../styles/typography.module.css"
import { Animate } from "react-simple-animate"
import CodeArea from "../components/CodeArea"

export default ({ location }) => {
  return (
    <Layout location={location} defaultLang="en">
      <Seo title="Migrate From V6 to V7" location={location} />
      <div className={containerStyles.container}>
        <section>
          <h1 className={typographyStyles.headingWithTopMargin} id="main">
            Migration Guide
          </h1>
          <p className={typographyStyles.subHeading}>V6 to V7</p>
        </section>

        <div
          style={{
            maxWidth: "1024px",
            margin: "0 auto",
          }}
        >
          <Animate
            play
            delay={0.1}
            start={{
              opacity: 0,
              transform: "translateY(20px)",
            }}
            end={{
              opacity: 1,
            }}
          >
            <p>Hi there, </p>
            <p>React Hook Form focus on the following aspect on Version 7:</p>

            <ul>
              <li>
                <p>(DX) Strict typed form</p>
              </li>
              <li>
                <p>Reduce package size</p>
              </li>
              <li>
                <p>Performance enhancements</p>
              </li>
              <li>
                <p>improve API's simplicity and consistency</p>
              </li>
            </ul>

            <p>
              Here are the changes that you would need to adjust. We sincerely
              hope those changes aren't creating too much trouble for your
              codebase. If you are wondering some of the rationals behind and
              discussion that we had among the community, you can take a look at
              this{" "}
              <a
                href="https://github.com/react-hook-form/react-hook-form/discussions/3714"
                target="_blank"
                rel="noopener noreferrer"
              >
                RFC
              </a>{" "}
              for more details.
            </p>

            <p>
              <span role="img" aria-label="tiny-heart">
                ❤️{" "}
              </span>
              <i>React hook Form Team</i>
            </p>

            <hr />

            <h2>Upgrade Packages</h2>

            <CodeArea
              rawData={`npm i react-hook-form@latest // react-hook-form: "^7.0.0"
              
npm i @hookform/resolvers@latest // @hookform/resolvers: "^2.0.0" if you are using resolvers

npm i @hookform/devtools@latest  // @hookform/devtools: "^3.0.0" if you are using devtools`}
            />
          </Animate>

          <hr />

          <main>
            <h2>APIs</h2>

            <section>
              <code className={typographyStyles.codeHeading}>
                <h2>register: </h2>
              </code>

              <p>
                <code>register</code> method is no longer occurred at{" "}
                <code>ref</code>, instead invoke the function itself and spread
                the props into the input. The function itself will return the
                following props: <code>onChange</code>, <code>onBlur</code>,{" "}
                <code>name</code> and <code>ref</code>.
              </p>

              <CodeArea
                withOutCopy
                rawData={`- <input ref={register, { required: true }} name="test" />
+ <input {...register('name', { required: true })} /> 
+ <TextInput {...register('name', { required: true })} />`}
              />

              <p>
                You can use this codemod library to speed up the process:{" "}
                <a
                  href="https://github.com/react-hook-form/codemod"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  https://github.com/react-hook-form/codemod
                </a>{" "}
                by running the following command:
              </p>

              <CodeArea
                withOutCopy
                rawData={`npx @hookform/codemod v7/update-register`}
              />

              <p>
                On top of that, for better type support, we have removed bracket
                syntax and replaced with dot syntax.
              </p>

              <CodeArea
                withOutCopy
                rawData={`- test[2].test
+ test.2.test`}
              />

              <h3>Custom register</h3>

              <p>
                You will no longer need the name attribute for custom register,
                you can supply the name of the input straight way.
              </p>

              <CodeArea
                withOutCopy
                rawData={`- register({ name: 'test' })
+ register('test') `}
              />

              <h3>ValueAs</h3>

              <p>
                <code>valueAs</code> will be invoked before{" "}
                <code>validate</code> function.
              </p>
              <CodeArea
                withOutCopy
                rawData={`- <input ref={register, { valueAsNumber: true, validate: (value) => parseInt(value) === 2 ) }} name="test" />
+ <input {...register('test', { valueAsNumber: true, validate: (value) => value === 2 ) }} /> // no longer need to parse again`}
              />
            </section>

            <hr />

            <section>
              <code className={typographyStyles.codeHeading}>
                <h2>Controller: </h2>
              </code>

              <p>
                We made some change to align consistently with{" "}
                <code>useController</code>'s API.
              </p>

              <ul>
                <li>
                  <p>
                    <code>as</code> prop has been removed, and we will
                    consistently using <code>render</code> prop in v7.
                  </p>
                </li>
                <li>
                  <p>
                    <code>render</code> prop will return an object which
                    contains <code>field</code> and <code>fieldState</code>.
                  </p>
                </li>
              </ul>

              <CodeArea
                withOutCopy
                rawData={`- <Controller as={<input />} />
+ <Controller render={({ field }) => <input {...field} />}

- <Controller render={(props, meta) => <input {...props} />} />
+ <Controller render={({ field, fieldState }) => <input {...field} />} />/>`}
              />
            </section>

            <hr />

            <section>
              <code className={typographyStyles.codeHeading}>
                <h2>reset: </h2>
              </code>

              <p>
                In V7, we made some changes in our API to keep them more
                consistent and declarative. <code>Reset</code>'s second option
                is the exact reason.
              </p>

              <CodeArea
                withOutCopy
                rawData={`- reset(values, { isDIrty: true })
+ // second argument is still optional
+ reset(values, { 
+   keepDefaultValues: true, // new
+   keepValues: true, // new
+   keepDirty: true, 
+ })`}
              />

              <hr />

              <section>
                <code className={typographyStyles.codeHeading}>
                  <h2>errors: </h2>
                </code>

                <p>
                  <code>errors</code> object has been moved into formState
                  object. This will info hook form that <code>errors</code>{" "}
                  object is been subscribed.
                </p>

                <CodeArea
                  withOutCopy
                  rawData={`- const { errors } = useForm();
+ const { formState: { errors } } = useForm();`}
                />
              </section>

              <hr />

              <section>
                <code className={typographyStyles.codeHeading}>
                  <h2>watch: </h2>
                </code>

                <p>
                  watch an array of inputs will return <code>array</code>{" "}
                  instead <code>object</code>
                </p>

                <CodeArea
                  withOutCopy
                  rawData={`- const { test, test1 } = watch(['test', 'test1']);
+ const [test, test1] = watch(['test', 'test1']);`}
                />
              </section>

              <hr />

              <section>
                <code className={typographyStyles.codeHeading}>
                  <h2>setError: </h2>
                </code>

                <p>
                  We have fixed the <code>setError</code> function to be
                  consistent with the rest of the APIs.
                </p>

                <CodeArea
                  withOutCopy
                  rawData={`- setError('test', { type: 'type', message: 'issue', shouldFocus: true })
+ setError('test', { type: 'type', message: 'issue' }, { shouldFocus: true })`}
                />
              </section>

              <hr />

              <section>
                <code className={typographyStyles.codeHeading}>
                  <h2>touched: </h2>
                </code>

                <p>
                  Renamed <code>touched</code> to <code>touchedFields</code>.
                </p>

                <CodeArea
                  withOutCopy
                  rawData={`- const { touched } = formState;
+ const { touchedFields } = formState;`}
                />
              </section>

              <hr />

              <section>
                <code className={typographyStyles.codeHeading}>
                  <h2>resolver: </h2>
                </code>

                <p>
                  We made some huge improvement on resolver, and the third
                  argument now need to host more value than just a single
                  boolean.{" "}
                </p>

                <CodeArea
                  withOutCopy
                  rawData={`- resolver: (values: any, context?: object) => Promise<ResolverResult> | ResolverResult
+ resolver: (
+    values: any, 
+    context?: object, 
+    options: { 
+       criteriaMode?: 'firstError' | 'all', 
+       names?: string[],
+       fields: { [name]: field } // Support nested field
+    }
+  ) => Promise<ResolverResult> | ResolverResult `}
                />
              </section>

              <hr />

              <section>
                <code className={typographyStyles.codeHeading}>
                  <h2>useFieldArray: </h2>
                </code>

                <p>
                  We are offering better focus management in{" "}
                  <code>useFieldArray</code>, so if you want to disable the
                  focus behaviour, you will have to adjust the option as well.
                </p>

                <CodeArea
                  withOutCopy
                  rawData={`- append({ test: 'test' }, false);
+ append({ test: 'test' }, { shouldFocus: false );`}
                />
              </section>
            </section>
          </main>
        </div>

        <Footer currentLanguage={"en"} />
      </div>
    </Layout>
  )
}
