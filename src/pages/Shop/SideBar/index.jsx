import React from "react";
import { Link } from "react-router-dom";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, FormGroup, Input } from "reactstrap";

function SideBarAccording({ index, open, toggle, type, typeProduct, handleClicked }) {
  const renderContent = (type) => {
    switch (type) {
      case "categories":
        return (
          <>
            <AccordionBody className="text-muted text-start" onClick={() => handleClicked(0)} accordionId={index}>
              All
            </AccordionBody>
            {typeProduct.map((el) => {
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
            <AccordionBody className="text-muted text-start" accordionId={index}>
              <Link onClick={() => handleClicked("size=S")} className="text-muted text-decoration-none size-s">
                S
              </Link>
            </AccordionBody>
            <AccordionBody className="text-muted text-start" accordionId={index}>
              {" "}
              <Link onClick={() => handleClicked("size=M")} className="text-muted text-decoration-none size-m">
                M
              </Link>
            </AccordionBody>
            <AccordionBody className="text-muted text-start" accordionId={index}>
              {" "}
              <Link onClick={() => handleClicked("size=L")} className="text-muted text-decoration-none size-l">
                L
              </Link>
            </AccordionBody>
            <AccordionBody className="text-muted text-start" accordionId={index}>
              {" "}
              <Link onClick={() => handleClicked("size=XL")} className="text-muted text-decoration-none size-xl">
                XL
              </Link>
            </AccordionBody>
          </>
        );
      case "color":
        return (
          <>
            <AccordionBody className="text-muted text-start" accordionId={index}>
              <FormGroup className="colorContainer">
                <div>
                  <Input
                    id="blue"
                    name="color"
                    type="radio"
                    value={"blue"}
                    onClick={() => handleClicked("color=blue")}
                  />
                  <Input id="red" name="color" type="radio" value={"red"} onClick={() => handleClicked("color=red")} />
                  <Input
                    id="pink"
                    name="color"
                    type="radio"
                    value={"pink"}
                    onClick={() => handleClicked("color=pink")}
                  />
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
