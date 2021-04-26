import React, { Component } from 'react'
import '../../App.css';
import Form from './Form';
import TodoList from './TodoList';
import UploadImage from './UploadImage';

export default function index() {
    return (
        <div>
            <h1>Todo</h1>
            <Form />
            <TodoList />
            <UploadImage />
        </div>
    )
}
