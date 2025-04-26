import streamlit as st
import os
import json
from datetime import datetime
from PIL import Image
import streamlit.components.v1 as components

# Константы и конфигурация
APP_NAME = "Har Kun"
APPS = {
    "Tasbeeh": {"icon": "📿", "category": "Religion", "path": "tasbeeh"},
    "Hisob": {"icon": "🧮", "category": "Finance", "path": "hisob"},
    "Ta'lim": {"icon": "🎓", "category": "Education", "path": "talim"},
    "Bozor": {"icon": "🛒", "category": "Shopping", "path": "bozor"},
    "Kutubxona": {"icon": "📚", "category": "Education", "path": "kutubxona"},
    "Taomnoma": {"icon": "🍲", "category": "Food", "path": "taomnoma"},
    "Intizom": {"icon": "📋", "category": "Organization", "path": "intizom"},
    "Mashg'ulot": {"icon": "🏋️", "category": "Health", "path": "mashgulot"},
    "Tabobat": {"icon": "💊", "category": "Health", "path": "tabobat"},
    "Fayllar": {"icon": "📁", "category": "Utility", "path": "fayllar"},
    "Transport": {"icon": "🚌", "category": "Travel", "path": "transport"},
    "Ob-havo": {"icon": "🌤️", "category": "Weather", "path": "ob_havo"},
    "Yangiliklar": {"icon": "📰", "category": "News", "path": "yangiliklar"},
    "So'zma So'z": {"icon": "💬", "category": "Language", "path": "sozma_soz"},
    "Sayohat": {"icon": "🧳", "category": "Travel", "path": "sayohat"}
}

def load_module(module_name):
    """Динамически загружает модуль приложения"""
    try:
        module_path = f"apps.{module_name}.app"
        module = __import__(module_path, fromlist=["app"])
        return module
    except ImportError as e:
        st.error(f"Не удалось загрузить модуль {module_name}: {e}")
        return None

def save_session_data():
    """Сохраняет данные сессии (для демонстрации)"""
    if "user_id" in st.session_state and "recent_apps" in st.session_state:
        # В будущем здесь будет сохранение в MongoDB
        pass

def load_session_data():
    """Загружает данные сессии (для демонстрации)"""
    # В будущем здесь будет загрузка из MongoDB
    if "user_id" not in st.session_state:
        st.session_state.user_id = "demo_user"
        
    if "recent_apps" not in st.session_state:
        st.session_state.recent_apps = []
        
    if "current_app" not in st.session_state:
        st.session_state.current_app = None
        
    # Инициализация темы (светлая по умолчанию)
    if "theme" not in st.session_state:
        st.session_state.theme = "light"

def update_recent_apps(app_name):
    """Обновляет список недавно использованных приложений"""
    # Если приложение уже в списке, удаляем его
    if app_name in st.session_state.recent_apps:
        st.session_state.recent_apps.remove(app_name)
    
    # Добавляем приложение в начало списка
    st.session_state.recent_apps.insert(0, app_name)
    
    # Ограничиваем список до 5 приложений
    if len(st.session_state.recent_apps) > 5:
        st.session_state.recent_apps = st.session_state.recent_apps[:5]
    
    save_session_data()

def toggle_theme():
    """Переключает между светлой и темной темой"""
    if st.session_state.theme == "light":
        st.session_state.theme = "dark"
    else:
        st.session_state.theme = "light"
    save_session_data()

def show_header():
    """Отображает шапку приложения"""
    # Если мы находимся в конкретном приложении
    if st.session_state.current_app:
        app_name = st.session_state.current_app
        app_info = APPS[app_name]
        
        col1, col2, col3 = st.columns([1, 6, 1])
        
        with col1:
            if st.button("← Назад"):
                st.session_state.current_app = None
                st.experimental_rerun()
                
        with col2:
            st.title(f"{APP_NAME} - {app_info['icon']} {app_name}")
            
        with col3:
            # Иконка профиля и настроек
            with st.expander("👤"):
                show_settings()
    else:
        # Главная страница
        col1, col2 = st.columns([6, 1])
        with col1:
            st.title(f"{APP_NAME} 🌟")
        with col2:
            # Иконка профиля и настроек
            with st.expander("👤"):
                show_settings()

    st.divider()

def show_settings():
    """Показывает настройки пользователя"""
    st.write("### Настройки")
    
    # Переключатель темы
    theme_label = "Темная тема" if st.session_state.theme == "light" else "Светлая тема"
    icon = "🌙" if st.session_state.theme == "light" else "☀️"
    
    if st.button(f"{icon} {theme_label}", key="theme_toggle"):
        toggle_theme()
        st.experimental_rerun()
    
    # Дополнительные настройки
    st.write("#### Язык")
    language = st.selectbox("Выберите язык", ["Русский", "Ўзбек", "English"], index=0, key="language_select")
    
    st.write("#### Аккаунт")
    st.write(f"ID: {st.session_state.user_id}")
    
    if st.button("Выйти", key="logout_button"):
        # Логика выхода (для демонстрации)
        st.info("Функция выхода будет добавлена позже")

def show_app_grid():
    """Отображает сетку приложений"""
    app_list = list(APPS.keys())
    
    # Вычисляем, сколько приложений на строку в зависимости от ширины экрана
    # Для мобильных - 3, для планшетов - 4, для десктопов - 5
    cols_per_row = 3
    
    # Создаем строки по cols_per_row колонок
    rows = [app_list[i:i+cols_per_row] for i in range(0, len(app_list), cols_per_row)]
    
    for row in rows:
        cols = st.columns(cols_per_row)
        for i, app_name in enumerate(row):
            app_info = APPS[app_name]
            with cols[i]:
                if st.button(f"{app_info['icon']}\n{app_name}", key=f"app_{app_name}", use_container_width=True):
                    st.session_state.current_app = app_name
                    update_recent_apps(app_name)
                    st.experimental_rerun()

def show_recent_apps():
    """Отображает строку недавно использованных приложений"""
    st.write("#### Недавно использованные")
    
    recent_apps = st.session_state.recent_apps
    
    if not recent_apps:
        st.write("У вас пока нет недавно использованных приложений")
        return
    
    # Создаем колонки для каждого недавнего приложения
    cols = st.columns(len(recent_apps))
    
    for i, app_name in enumerate(recent_apps):
        app_info = APPS[app_name]
        with cols[i]:
            if st.button(f"{app_info['icon']}\n{app_name}", key=f"recent_{app_name}", use_container_width=True):
                st.session_state.current_app = app_name
                update_recent_apps(app_name)
                st.experimental_rerun()

def inject_theme_script():
    """Добавляет JavaScript для управления темами"""
    theme = st.session_state.theme
    
    # JavaScript для установки атрибута data-theme
    script = f"""
    <script>
        // Устанавливаем тему сразу при загрузке страницы
        document.addEventListener('DOMContentLoaded', (event) => {{
            document.body.setAttribute('data-theme', '{theme}');
            document.querySelector('.stApp').setAttribute('data-theme', '{theme}');
        }});
    </script>
    """
    
    # Вставляем скрипт
    st.markdown(script, unsafe_allow_html=True)

def main():
    """Основная функция приложения"""
    st.set_page_config(
        page_title=APP_NAME,
        page_icon="🌟",
        layout="wide"
    )
    
    # Загружаем данные сессии
    load_session_data()
    
    # Загружаем пользовательские стили
    with open("css/style.css", encoding="utf-8") as f:
        st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)
    
    # Добавляем JavaScript для управления темами
    inject_theme_script()
    
    # Показываем шапку
    show_header()
    
    # Если выбрано конкретное приложение
    if st.session_state.current_app:
        app_name = st.session_state.current_app
        app_path = APPS[app_name]["path"]
        
        # Загружаем модуль приложения
        module = load_module(app_path)
        
        if module and hasattr(module, "app"):
            # Запускаем приложение
            module.app()
        else:
            st.error(f"Приложение {app_name} находится в разработке")
    
    else:
        # Главный экран
        # Сначала сетка приложений
        show_app_grid()
        
        # Снизу - недавно использованные приложения
        st.divider()
        show_recent_apps()

if __name__ == "__main__":
    main()
