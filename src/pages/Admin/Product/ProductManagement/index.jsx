import { InputLabel, InputSelect } from "components/Input";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from "reactstrap";
import { showToast } from "redux/toast/toastSlice";
import { createNewProduct, updateProduct } from "services";
function ProductManagement({ modal, data, toggle, size, color, type }) {
  const [formattedType, SetFormattedType] = useState([]);
  const [formattedSize, SetFormattedSize] = useState([]);
  const [formattedColor, SetFormattedColor] = useState([]);
  const [loading, SetLoading] = useState(false);
  const { handleSubmit, control, setValue } = useForm();
  const dispatch = useDispatch();
  //checkAction edit-true or add-false
  const checkAction = useCallback(() => {
    return Object.keys(data).length > 1;
  }, [data]);
  //format data
  useEffect(() => {
    const handleData = () => {
      const typeFormat = type?.map((product) => {
        return { label: product.tenLoai, value: product.id };
      });
      const sizeFormat = size?.map((product) => {
        return { label: product.size, value: product.size_id };
      });
      const colorFormat = color?.map((product) => {
        return { label: product.color, value: product.color_id };
      });
      SetFormattedType(typeFormat);
      SetFormattedSize(sizeFormat);
      SetFormattedColor(colorFormat);
    };
    handleData();
  }, [color, size, type]);

  //handle data product when action is edit
  useEffect(() => {
    if (checkAction()) {
      setValue("name", data.name);
      setValue("price", data.price);
      setValue("sold", data.sold);
      setValue("date", moment(new Date(data.date)).format("YYYY-MM-DD"));
      setValue(
        "TypeProduct",
        formattedType.find((el) => el.value === data.idLoai)
      );
      setValue(
        "SizeProduct",
        formattedSize.filter((obj) => data?.allSize?.split(",").includes(obj.label))
      );
      setValue(
        "ColorProduct",
        formattedColor.filter((obj) => data?.allColor?.split(",").includes(obj.label))
      );
    } else {
      setValue("name", "");
      setValue("price", "");
      setValue("sold", "");
      setValue("date", moment().format("YYYY-MM-DD"));
      setValue("TypeProduct", "");
      setValue("SizeProduct", "");
      setValue("ColorProduct", "");
      setValue("Image", "");
    }
  }, [data, formattedType, formattedSize, formattedColor, setValue, checkAction]);

  const onSubmit = async (dataForm) => {
    SetLoading(true);
    try {
      const { TypeProduct, SizeProduct, ColorProduct, price, ...rest } = dataForm;
      const dataProduct = {
        ...rest,
        price: +price,
        idLoai: TypeProduct.value,
        size: SizeProduct.map((el) => el.value),
        color: ColorProduct.map((el) => el.value),
      };
      //when action is add
      if (!checkAction()) {
        const res = await createNewProduct(dataProduct);
        if (res) {
          dispatch(showToast({ type: "success", message: res }));
          toggle();
        }
      } else {
        //when action is eit
        const dataProductUpdate = {
          ...dataProduct,
          id: data.id,
        };
        const res = await updateProduct(dataProductUpdate);
        if (res) dispatch(showToast({ type: "success", message: res }));
        else dispatch(showToast({ type: "danger", message: "Something's wrong" }));
      }
    } catch (err) {
      console.log(err);
    } finally {
      SetLoading(false);
      toggle();
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Modal scrollable size="lg" keyboard isOpen={modal} toggle={() => toggle()} centered>
        <ModalHeader toggle={() => toggle()}>Product Information</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Controller
              name="name"
              control={control}
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
                  label="Name"
                  error={error}
                  value={value}
                  inputRef={ref}
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Controller
              name="price"
              control={control}
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
                  label="Price"
                  error={error}
                  value={value}
                  inputRef={ref}
                />
              )}
            />
          </FormGroup>
          {checkAction() && (
            <FormGroup>
              <Controller
                name="sold"
                control={control}
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
                    label="Sold"
                    error={error}
                    value={value}
                    inputRef={ref}
                  />
                )}
              />
            </FormGroup>
          )}
          <FormGroup>
            <Controller
              name="date"
              control={control}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <InputLabel
                  id={name}
                  name={name}
                  type="date"
                  onBlur={onBlur}
                  onChange={onChange}
                  label="Date"
                  error={error}
                  value={value}
                  inputRef={ref}
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Controller
              name="TypeProduct"
              control={control}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <InputSelect
                  id={name}
                  name={name}
                  options={formattedType}
                  onBlur={onBlur}
                  onChange={onChange}
                  label="Type Product"
                  error={error}
                  inputRef={ref}
                  data={value}
                  placeholder="What district do you live in?"
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Controller
              name="SizeProduct"
              control={control}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <InputSelect
                  id={name}
                  name={name}
                  options={formattedSize}
                  onBlur={onBlur}
                  onChange={onChange}
                  label="Size Product"
                  error={error}
                  inputRef={ref}
                  data={value}
                  isMulti={true}
                  placeholder="What district do you live in?"
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Controller
              name="ColorProduct"
              control={control}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <InputSelect
                  id={name}
                  name={name}
                  options={formattedColor}
                  onBlur={onBlur}
                  onChange={onChange}
                  label="Color Product"
                  error={error}
                  inputRef={ref}
                  data={value}
                  isMulti={true}
                  placeholder="What district do you live in?"
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Controller
              name="Image"
              control={control}
              rules={{ required: !checkAction() }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <InputLabel
                  id={name}
                  name={name}
                  type="file"
                  onBlur={onBlur}
                  onChange={onChange}
                  label="Upload images"
                  error={error}
                  value={value}
                  inputRef={ref}
                  isMulti={true}
                />
              )}
            />
          </FormGroup>
          <div className="d-flex" style={{ gap: "10px" }}>
            {data?.allImg?.split(";").map((el, index) => {
              return (
                <a href={el} target="blank" key={index}>
                  <img style={{ maxWidth: "120px" }} className="img-fluid" src={el} alt="Img" />
                </a>
              );
            })}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button outline color="success" type="submit" onClick={handleSubmit(onSubmit)}>
            {loading ? <Spinner size="sm" /> : "Apply"}
          </Button>
          <Button outline color="secondary" onClick={() => toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Form>
  );
}

export default ProductManagement;
