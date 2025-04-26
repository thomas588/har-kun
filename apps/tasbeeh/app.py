import streamlit as st
from datetime import datetime

def load_data():
    """Загружает данные счетчика (в будущем из БД)"""
    if "tasbeeh_counters" not in st.session_state:
        st.session_state.tasbeeh_counters = [
            {"name": "Субханаллах", "count": 0, "goal": 33},
            {"name": "Альхамдулиллях", "count": 0, "goal": 33},
            {"name": "Аллаху Акбар", "count": 0, "goal": 34}
        ]

def save_data():
    """Сохраняет данные счетчика (в будущем в БД)"""
    # В будущем здесь будет код для сохранения в БД
    pass

def increase_counter(index):
    """Увеличивает значение счетчика"""
    st.session_state.tasbeeh_counters[index]["count"] += 1
    save_data()

def reset_counter(index):
    """Сбрасывает значение счетчика"""
    st.session_state.tasbeeh_counters[index]["count"] = 0
    save_data()

def show_counter(index, counter):
    """Отображает интерфейс одного счетчика"""
    col1, col2, col3 = st.columns([5, 3, 2])
    
    with col1:
        st.subheader(counter["name"])
        
    with col2:
        progress = min(1.0, counter["count"] / counter["goal"])
        st.progress(progress)
        
    with col3:
        st.metric("", f"{counter['count']}/{counter['goal']}")
    
    col1, col2 = st.columns(2)
    
    with col1:
        if st.button("Увеличить", key=f"inc_{index}", use_container_width=True):
            increase_counter(index)
            st.experimental_rerun()
            
    with col2:
        if st.button("Сбросить", key=f"reset_{index}", use_container_width=True):
            reset_counter(index)
            st.experimental_rerun()
    
    st.divider()

def app():
    """Основная функция приложения Tasbeeh"""
    load_data()
    
    st.write("### Электронная Тасбих")
    st.write("Используйте эти счетчики для зикра:")
    
    # Отображаем все счетчики
    for i, counter in enumerate(st.session_state.tasbeeh_counters):
        show_counter(i, counter)
        
    # Кнопка для сброса всех счетчиков
    if st.button("Сбросить все", use_container_width=True):
        for i in range(len(st.session_state.tasbeeh_counters)):
            reset_counter(i)
        st.experimental_rerun()
