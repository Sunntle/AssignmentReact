import React from "react";
import { Link } from "react-router-dom";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, FormGroup, Input } from "reactstrap";

function SideBarAccording({ index, open, toggle, type, data, handleClicked }) {
  const renderContent = (type) => {
    switch (type) {
      case "categories":
        return (
          <>
            <AccordionBody className="text-muted text-start" onClick={() => handleClicked(0)} accordionId={index}>
              All
            </AccordionBody>
            {data?.map((el) => {
              return (
                <AccordionBody
                  key={el.id}
                  onClick={() => handleClicked(el.id)}
                  className="text-muted text-start"
                  accordionId={index}
                >
                  {el.tenLoai}
                </AccordionBody>
              );
            })}
          </>
        );
      case "filter price":
        return (
          <>
            <AccordionBody className="text-muted text-start" accordionId={index}>
              <Link className="text-muted text-decoration-none price" onClick={() => handleClicked("lte=500000")}>
                0 - 500000đ
              </Link>
            </AccordionBody>
            <AccordionBody className="text-muted text-start" accordionId={index}>
              <Link className="text-muted text-decoration-none price" onClick={() => handleClicked("gte=500000")}>
                &gt;= 500000đ
              </Link>
            </AccordionBody>
          </>
        );
      case "size":
        return (
          <>
            {data?.map((el, i) => {
              return (
                <AccordionBody key={i + index} className="text-muted text-start" accordionId={index}>
                  <Link onClick={() => handleClicked(`size=${el.size}`)} className="text-muted text-decoration-none">
                    {el.size}
                  </Link>
                </AccordionBody>
              );
            })}
          </>
        );
      case "color":
        return (
          <>
            <AccordionBody className="text-muted text-start" accordionId={index}>
              <FormGroup className="colorContainer">
                <div>
                  {data?.map((el, i) => {
                    return (
                      <Input
                        key={i}
                        id={el.color}
                        name="color"
                        type="radio"
                        value={el.color}
                        onClick={() => handleClicked(`color=${el.color}`)}
                      />
                    );
                  })}
                </div>
              </FormGroup>
            </AccordionBody>
          </>
        );
      default:
        return;
    }
  };
  return (
    <>
      <Accordion flush open={open} toggle={() => toggle(index)}>
        <AccordionItem>
          <AccordionHeader targetId={index}>
            <span className="text-uppercase">{type}</span>
          </AccordionHeader>
          {renderContent(type)}
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default SideBarAccording;
