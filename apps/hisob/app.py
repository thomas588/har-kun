import streamlit as st
import pandas as pd
from datetime import datetime

def load_data():
    """Загружает данные калькулятора (в будущем из БД)"""
    if "calculator_memory" not in st.session_state:
        st.session_state.calculator_memory = []
        
    if "calculator_display" not in st.session_state:
        st.session_state.calculator_display = "0"
        
    if "calculator_operation" not in st.session_state:
        st.session_state.calculator_operation = None
        
    if "calculator_first_operand" not in st.session_state:
        st.session_state.calculator_first_operand = None

def add_to_display(value):
    """Добавляет значение на дисплей калькулятора"""
    if st.session_state.calculator_display == "0":
        st.session_state.calculator_display = value
    else:
        st.session_state.calculator_display += value

def clear_display():
    """Очищает дисплей калькулятора"""
    st.session_state.calculator_display = "0"
    st.session_state.calculator_operation = None
    st.session_state.calculator_first_operand = None

def set_operation(operation):
    """Устанавливает текущую операцию"""
    try:
        st.session_state.calculator_first_operand = float(st.session_state.calculator_display)
        st.session_state.calculator_operation = operation
        st.session_state.calculator_display = "0"
    except ValueError:
        st.error("Неверное число")

def calculate_result():
    """Вычисляет результат операции"""
    try:
        first_operand = st.session_state.calculator_first_operand
        second_operand = float(st.session_state.calculator_display)
        operation = st.session_state.calculator_operation
        
        result = 0
        if operation == "+":
            result = first_operand + second_operand
        elif operation == "-":
            result = first_operand - second_operand
        elif operation == "*":
            result = first_operand * second_operand
        elif operation == "/":
            if second_operand == 0:
                st.error("Деление на ноль невозможно")
                return
            result = first_operand / second_operand
            
        # Записываем историю вычислений
        st.session_state.calculator_memory.append({
            "time": datetime.now().strftime("%H:%M:%S"),
            "calculation": f"{first_operand} {operation} {second_operand} = {result}"
        })
        
        # Округляем до 8 знаков после запятой для отображения
        result_str = str(round(result, 8)).rstrip('0').rstrip('.') if '.' in str(round(result, 8)) else str(round(result, 8))
        st.session_state.calculator_display = result_str
        st.session_state.calculator_operation = None
        st.session_state.calculator_first_operand = None
        
    except (ValueError, TypeError):
        st.error("Ошибка вычисления")

def app():
    """Основная функция приложения Hisob (Калькулятор)"""
    load_data()
    
    st.write("### Калькулятор")
    
    # Дисплей калькулятора
    st.write(f"## {st.session_state.calculator_display}")
    st.divider()
    
    # Кнопки калькулятора
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        if st.button("7", key="btn_7", use_container_width=True):
            add_to_display("7")
            st.experimental_rerun()
            
    with col2:
        if st.button("8", key="btn_8", use_container_width=True):
            add_to_display("8")
            st.experimental_rerun()
            
    with col3:
        if st.button("9", key="btn_9", use_container_width=True):
            add_to_display("9")
            st.experimental_rerun()
            
    with col4:
        if st.button("/", key="btn_div", use_container_width=True):
            set_operation("/")
            st.experimental_rerun()
    
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        if st.button("4", key="btn_4", use_container_width=True):
            add_to_display("4")
            st.experimental_rerun()
            
    with col2:
        if st.button("5", key="btn_5", use_container_width=True):
            add_to_display("5")
            st.experimental_rerun()
            
    with col3:
        if st.button("6", key="btn_6", use_container_width=True):
            add_to_display("6")
            st.experimental_rerun()
            
    with col4:
        if st.button("*", key="btn_mul", use_container_width=True):
            set_operation("*")
            st.experimental_rerun()
    
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        if st.button("1", key="btn_1", use_container_width=True):
            add_to_display("1")
            st.experimental_rerun()
            
    with col2:
        if st.button("2", key="btn_2", use_container_width=True):
            add_to_display("2")
            st.experimental_rerun()
            
    with col3:
        if st.button("3", key="btn_3", use_container_width=True):
            add_to_display("3")
            st.experimental_rerun()
            
    with col4:
        if st.button("-", key="btn_sub", use_container_width=True):
            set_operation("-")
            st.experimental_rerun()
    
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        if st.button("0", key="btn_0", use_container_width=True):
            add_to_display("0")
            st.experimental_rerun()
            
    with col2:
        if st.button(".", key="btn_dot", use_container_width=True):
            if "." not in st.session_state.calculator_display:
                add_to_display(".")
                st.experimental_rerun()
            
    with col3:
        if st.button("C", key="btn_clear", use_container_width=True):
            clear_display()
            st.experimental_rerun()
            
    with col4:
        if st.button("+", key="btn_add", use_container_width=True):
            set_operation("+")
            st.experimental_rerun()
    
    # Кнопка =
    if st.button("=", key="btn_equals", use_container_width=True):
        calculate_result()
        st.experimental_rerun()
    
    # История вычислений
    if st.session_state.calculator_memory:
        st.write("### История вычислений")
        for item in reversed(st.session_state.calculator_memory[-5:]):
            st.write(f"{item['time']}: {item['calculation']}")
