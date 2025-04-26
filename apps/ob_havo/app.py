import streamlit as st

def app():
    """Основная функция приложения Ob-havo (Погода)"""
    st.write("### Ob-havo - Прогноз погоды")
    
    # Выбор города
    city = st.selectbox("Выберите город", ["Ташкент", "Самарканд", "Бухара", "Наманган"])
    
    if st.button("Показать прогноз"):
        # Здесь в будущем будет API для получения данных о погоде
        show_mock_weather(city)

def show_mock_weather(city):
    """Показывает демо-данные о погоде"""
    st.write(f"## Погода в городе {city}")
    
    # Текущая погода
    col1, col2 = st.columns(2)
    with col1:
        st.write("### Сейчас")
        st.write("🌤️ +28°C")
        st.write("Ощущается как: +30°C")
        st.write("Влажность: 45%")
        st.write("Ветер: 3 м/с")
    
    with col2:
        st.write("### Сегодня")
        st.write("Утро: 🌅 +24°C")
        st.write("День: ☀️ +31°C")
        st.write("Вечер: 🌇 +26°C")
        st.write("Ночь: 🌙 +22°C")
    
    # Прогноз на неделю
    st.write("### Прогноз на неделю")
    
    cols = st.columns(7)
    days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
    temps = ["+28°C", "+29°C", "+30°C", "+27°C", "+26°C", "+28°C", "+29°C"]
    icons = ["🌤️", "☀️", "☀️", "🌦️", "🌧️", "⛅", "🌤️"]
    
    for i in range(7):
        with cols[i]:
            st.write(f"**{days[i]}**")
            st.write(f"{icons[i]}")
            st.write(f"{temps[i]}")
