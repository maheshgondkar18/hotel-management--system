import React from "react";
import { fireEvent, getByLabelText, render, screen, waitFor } from "@testing-library/react";
import RoomService from "./RoomService";
import onFormSubmit from "./RoomService";
import user from '@testing-library/user-event';
import regeneratorRuntime from "regenerator-runtime";
import { act } from "react-dom/test-utils";


/**
 * @jest-environment jsdom
 */
describe('RoomService',()=>{
    const onFormSubmit = jest.fn();
    beforeEach(() =>{
    onFormSubmit.mockClear();
    });

    it('onFormSubmit is called when all fields pass validation',async() =>{
        user.type(getRoomNumber(),'1010');
        user.type(getNoOfBedInRoom(),'3');
        user.type(getRateOfRoom(),'1000');
        user.click(screen.getByRole('button',{name: /submit/i}));
        
        await waitFor(() =>{
            expect(onFormSubmit).toHaveBeenCalledTimes(1);
        })

        expect(onFormSubmit).toHaveBeenCalledWith({lazy: true});
    })
});

function getRoomNumber(){
    return screen.getByLabelText(/Room Number/i)
}
function getNoOfBedInRoom(){
    return screen.getByRole('spinbutton',{
        roomSize: /no\. of beds in room/i
    })
}

function getRateOfRoom(){
    return screen.getByRole('spinbuton',{
        roomRates: /room rate per bed/i
    })
}
