import * as React from 'react';
import { Monster } from './Monster';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Input } from 'reactstrap';
import 'whatwg-fetch';

interface Props {
    monsters: [Monster[], Monster[], Monster[], Monster[]];
    monsterList: Monster[];
    applySearch: (e: any) => void;
    setSlot: (monster: Monster) => void;
    modalState: boolean;
    toggleModal: () => void;
}

class MonsterDialog extends React.Component<Props, {}> {
    render() {
        let monsters = [];
        for (let monster of this.props.monsterList) {
            let imgUrl = monster.image60_href;
            monsters.push(
                <a key={monster.id} onClick={(e) => this.props.setSlot(monster)}>
                    <img src={imgUrl} alt={monster.id.toString()} />
                </a>
            );
        }

        return (
            <Modal
                isOpen={this.props.modalState}
                toggle={this.props.toggleModal}
                backdrop={true}
            >
                <ModalHeader toggle={this.props.toggleModal}>Monster Selection</ModalHeader>
                <ModalBody>
                    <Input
                        style={{width: '100%'}}
                        onChange={this.props.applySearch}
                    />
                    {monsters}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.toggleModal}>Close</Button>
                    <Button color="primary" onClick={this.props.toggleModal}>Save changes</Button>
                </ModalFooter>
            </Modal>
        );
    }
    
    shouldComponentUpdate(nextProps: Props, nextState: {}) {
        if ((this.props.modalState === nextProps.modalState)
            && (this.props.monsterList.length === nextProps.monsterList.length)) {
            return false;
        } else {
            return true;
        }
    }

    componentDidUpdate() {
        console.debug(`Component was updated.`);
    }
}

export default MonsterDialog;