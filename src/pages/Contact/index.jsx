import { faEarthAsia, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";
import "./ContactStyle.scss";
import { Controller, useForm } from "react-hook-form";
import { InputLabel } from "components/Input";
function ContactPage() {
  const { handleSubmit, control } = useForm();
  const onSubmit = (dataForm) => {
    console.log(dataForm);
  };
  return (
    <Container className="contact-wrap">
      <iframe
        title="map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4230403983906!2d106.6272727749091!3d10.855393589298274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175290c3e61af89%3A0xc6da6b0f132ec62c!2zQ2FvIMSQ4bqzbmcgRlBUIC0gR2nhuqNuZyDEkMaw4budbmc!5e0!3m2!1sen!2s!4v1690543816235!5m2!1sen!2s"
        style={{ border: 0, width: "100%", minHeight: "600px" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <Row>
        <Col md="5" lg="4" className="py-5 px-3 bg-gray">
          <div className="contact-info">
            <div className="text-end">
              <div
                style={{ width: "40px", height: "40px" }}
                className="d-inline-block rounded-circle border position-relative"
              >
                <FontAwesomeIcon icon={faPhone} className="position-absolute top-50 start-50 contact-icon" />
              </div>
            </div>
            <div className="des">
              <p>0938339721</p>
              <p>0938339721</p>
            </div>
          </div>
          <div className="contact-info">
            <div className="text-end">
              <div
                style={{ width: "40px", height: "40px" }}
                className="d-inline-block rounded-circle border position-relative"
              >
                <FontAwesomeIcon icon={faEarthAsia} className="position-absolute top-50 start-50 contact-icon" />
              </div>
            </div>
            <div className="des">
              <p>taile2608@gmail.com</p>
              <p>taile0826.com</p>
            </div>
          </div>
          <div className="contact-info">
            <div className="text-end">
              <div
                style={{ width: "40px", height: "40px" }}
                className="d-inline-block rounded-circle border position-relative"
              >
                <FontAwesomeIcon icon={faLocationDot} className="position-absolute top-50 start-50 contact-icon" />
              </div>
            </div>
            <div className="des">
              <p>To Ky, Dong Hung Thuan</p>
              <p>Quan 12, Tp.HCM</p>
            </div>
          </div>
        </Col>
        <Col md="7" lg="8" className="px-2">
          <div className="bg-gray h-100 px-3 py-5">
            <h3 className="py-3">Get In Touch</h3>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col xs="6">
                  <FormGroup>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState: { invalid, isTouched, isDirty, error },
                        formState,
                      }) => (
                        <InputLabel
                          id={name}
                          name={name}
                          type="text"
                          onBlur={onBlur}
                          onChange={onChange}
                          placeholder="Name"
                          error={error}
                          inputRef={ref}
                        />
                      )}
                    />
                  </FormGroup>
                </Col>
                <Col xs="6">
                  <FormGroup>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState: { invalid, isTouched, isDirty, error },
                        formState,
                      }) => (
                        <InputLabel
                          id={name}
                          name={name}
                          type="email"
                          onBlur={onBlur}
                          onChange={onChange}
                          placeholder="Email"
                          error={error}
                          inputRef={ref}
                        />
                      )}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Controller
                  name="subject"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <InputLabel
                      id={name}
                      name={name}
                      type="text"
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder="Subject"
                      error={error}
                      inputRef={ref}
                    />
                  )}
                />
              </FormGroup>
              <FormGroup>
                <Controller
                  name="message"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <InputLabel
                      id={name}
                      name={name}
                      type="textarea"
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder="Message"
                      error={error}
                      inputRef={ref}
                    />
                  )}
                />
              </FormGroup>
              <div className="text-start">
                <Button className="py-2 px-4 ">Send</Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactPage;
