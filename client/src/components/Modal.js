import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

const CustomModal = ({ toggle, onSave, activeItem }) => {
  const [state, setState] = useState({ activeItem });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const newItem = { ...state.activeItem, [name]: value };
    setState({ activeItem: newItem });
  };

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}> Task Item </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              value={state.activeItem.title}
              onChange={handleChange}
              placeholder="Enter Task Title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              value={state.activeItem.description}
              onChange={handleChange}
              placeholder="Enter Task Description"
            />
          </FormGroup>
          <FormGroup check>
            <Label for="completed">
              <Input
                type="checkbox"
                name="completed"
                checked={state.activeItem.completed}
                onChange={handleChange}
              />
              Completed
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => onSave(state.activeItem)}>Save</Button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;