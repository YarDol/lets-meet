import { professionsObject as professions } from "./professions.api";
const qualities = {
    tedious: {
        _id: "67rdca3eeb7f6fgeed471198",
        name: "Нудний",
        color: "primary"
    },
    strange: {
        _id: "67rdca3eeb7f6fgeed471100",
        name: "Дивний",
        color: "secondary"
    },
    buller: {
        _id: "67rdca3eeb7f6fgeed4711012",
        name: "Троль",
        color: "success"
    },
    alcoholic: {
        _id: "67rdca3eeb7f6fgeed471101",
        name: "Алкоголік",
        color: "danger"
    },
    handsome: {
        _id: "67rdca3eeb7f6fgeed471102",
        name: "Красунчик",
        color: "info"
    },
    uncertain: {
        _id: "67rdca3eeb7f6fgeed471103",
        name: "Невпевнений",
        color: "dark"
    }
};

const users = [
    {
        _id: "67rdca3eeb7f6fgeed471815",
        name: "Джон Доріан",
        profession: professions.doctor,
        qualities: [qualities.tedious, qualities.uncertain, qualities.strange],
        completedMeetings: 36,
        rate: 2.5,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed471816",
        name: "Кокс",
        profession: professions.doctor,
        qualities: [qualities.buller, qualities.handsome, qualities.alcoholic],
        completedMeetings: 15,
        rate: 2.5,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed471817",
        name: "Боб Келсо",
        profession: professions.doctor,
        qualities: [qualities.buller],
        completedMeetings: 247,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed471818",
        name: "Рейчел Грін",
        profession: professions.waiter,
        qualities: [qualities.uncertain],
        completedMeetings: 148,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed471819",
        name: "Шелдон Купер",
        profession: professions.physics,
        qualities: [qualities.strange, qualities.tedious],
        completedMeetings: 37,
        rate: 4.6,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed471820",
        name: "Леонард Хофстедтер",
        profession: professions.physics,
        qualities: [qualities.strange, qualities.uncertain],
        completedMeetings: 147,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed471821",
        name: "Говард Воловіц",
        profession: professions.engineer,
        qualities: [qualities.strange, qualities.tedious],
        completedMeetings: 72,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed471822",
        name: "Нікола Тесла",
        profession: professions.engineer,
        qualities: [qualities.handsome],
        completedMeetings: 72,
        rate: 5,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed471823",
        name: "Моніка Гелер",
        profession: professions.cook,
        qualities: [qualities.strange, qualities.uncertain],
        completedMeetings: 17,
        rate: 4.5,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed471824",
        name: "Рататуй",
        profession: professions.cook,
        qualities: [qualities.handsome, qualities.buller],
        completedMeetings: 17,
        rate: 4.5,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed47181f",
        name: "Джоуі Трибіані",
        profession: professions.actor,
        qualities: [qualities.uncertain, qualities.strange],
        completedMeetings: 434,
        rate: 3.5,
        bookmark: false
    },
    {
        _id: "67rdca3eeb7f6fgeed47181r",
        name: "Бред Піт",
        profession: professions.actor,
        qualities: [qualities.handsome],
        completedMeetings: 434,
        rate: 5,
        bookmark: false
    }
];

if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(users));
}

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(JSON.parse(localStorage.getItem("users")));
        }, 2000);
    });
const update = (id, data) =>
    new Promise((resolve) => {
        const users = JSON.parse(localStorage.getItem("users"));
        const userIndex = users.findIndex((u) => u._id === id);
        users[userIndex] = { ...users[userIndex], ...data };
        localStorage.setItem("users", JSON.stringify(users));
        resolve(users[userIndex]);
    });

const getById = (id) =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(
                JSON.parse(localStorage.getItem("users")).find(
                    (user) => user._id === id
                )
            );
        }, 1000);
    });
export default {
    fetchAll,
    getById,
    update
};