import React from 'react';
import PropTypes from 'prop-types';
import styles from './SkillsComponent.module.css';
import skillService from '../../services/skill.service';
import Button from "react-bootstrap/Button"
import { PencilSquare } from 'react-bootstrap-icons';
import { Trash } from 'react-bootstrap-icons'
import EditSkillComponent from '../EditSkillComponent/EditSkillComponent';
import CreateSkillComponent from '../CreateSkillComponent/CreateSkillComponent';

class SkillsComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      skills: [],
      editedId: -1,
      filterValue: ''
    }

    this.editItem = this.editItem.bind(this);
    this.filterSkills = this.filterSkills.bind(this);
    this.createNewSkill = this.createNewSkill.bind(this);
  }
  componentDidMount() {
    skillService.getSkills(this.state.filterValue)
      .then(res => {
        this.setState({
          skills: res
        });
      })
  }
  handleDelete(event, id) {
    skillService.deleteSkill(id)
      .then(res => {
        this.setState((state) => {
          return {
            skills: state.skills.filter(e => e.id !== id)
          };
        });
      })
  }
  setEditedId(event, id) {
    this.setState({
      editedId: id
    });
  }
  editItem(event) {
    if (event.key === 'Enter') {
      event.preventDefault();

      skillService.updateSkill(this.state.editedId, event.target.value)
        .then(res => {
          const skills = this.state.skills.map((e) => {
            if (e.id === this.state.editedId) {
              return {
                id: e.id,
                name: event.target.value
              };
            }
            else {
              return e;
            }
          });

          this.setState({
            skills: skills,
            editedId: -1
          });
        });
    }
  }
  filterSkills(e) {
    skillService.getSkills(e.target.value)
      .then(res => {
        this.setState({
          skills: res,
          filterValue: e.target.value
        });
      });
  }
  createNewSkill(e, skillName) {
    const addPromise = skillService.addSkill(skillName);

    addPromise.then(res => {
      skillService.getSkills(this.state.filterValue)
        .then(res => {
          this.setState({
            skills: res
          });
        });
    });
  }

  render() {
    console.log(this.state.skills)
    return (
      <div className={styles.SkillsComponent}>
        <label htmlFor='filterByName'>Find the skill you are looking for: </label>
        <input type='text' id='filterByName' onChange={this.filterSkills}></input>
        <CreateSkillComponent createNewSkill={this.createNewSkill}></CreateSkillComponent>
        <table>
          <thead>
            <tr>
              <th>Nr</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.skills.map((e, index) => {
              return (
                <tr key={e.id}>
                  <td>{index + 1}</td>
                  <td>
                    <EditSkillComponent name={e.name} editedId={this.state.editedId} id={e.id} editItem={this.editItem}></EditSkillComponent>
                  </td>
                  <td>
                    <Button variant="success" onClick={(event) => this.setEditedId(event, e.id)}>
                      <PencilSquare></PencilSquare>
                    </Button>
                    <Button variant='danger' onClick={(event) => this.handleDelete(event, e.id)}>
                      <Trash></Trash>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

SkillsComponent.propTypes = {};

SkillsComponent.defaultProps = {};

export default SkillsComponent;
