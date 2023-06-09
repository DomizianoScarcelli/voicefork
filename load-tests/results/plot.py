import csv
import pandas as pd
import os
import numpy as np
import matplotlib.pyplot as plt

DATA_PATH = os.path.abspath("./data")
EMBEDDINGS_PATH = os.path.abspath(os.path.join(DATA_PATH, "embeddings"))
RESERAVATIONS_PATH = os.path.abspath(os.path.join(DATA_PATH, "reservations"))
RESTAURANTS_PATH = os.path.abspath(os.path.join(DATA_PATH, "restaurants"))
USERS_PATH = os.path.abspath(os.path.join(DATA_PATH, "users"))
PROXY_PATH = os.path.abspath(os.path.join(DATA_PATH, "proxy"))

SAVE_AVG_PATH = os.path.abspath(os.path.join(DATA_PATH, "averages"))
SAVE_AVG_PLOTS = os.path.abspath("./plots")


def get_cpu_path(path: str) -> str:
    return os.path.join(path, "cpu")


def get_memory_path(path: str) -> str:
    return os.path.join(path, "memory")


def get_tasks_path(path: str) -> str:
    return os.path.join(path, "tasks")


def get_cpu_reservation_path(path: str) -> str:
    return os.path.join(path, "cpu_reservation")


def get_memory_reservation_path(path: str) -> str:
    return os.path.join(path, "memory_reservation")


def generate_average(folder_path: str, save_name: str):
    aggregated_keys = {}
    for file in os.listdir(folder_path):
        if not file.endswith(".csv"):
            continue
        abs_path = os.path.join(folder_path, file)
        with open(abs_path, "r") as f:
            reader = csv.reader(f)
            for index, row in enumerate(list(reader)[5:]):
                if index not in aggregated_keys:
                    aggregated_keys[index] = [float(row[1])]
                else:
                    aggregated_keys[index] += [float(row[1])]
    aggregated_keys = {key: np.mean(value)
                       for key, value in aggregated_keys.items()}

    print(aggregated_keys)

    with open(os.path.join(SAVE_AVG_PATH, save_name), 'w') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(aggregated_keys.keys())
        writer.writerow(aggregated_keys.values())


def plot_csv(csv_path: str, x_axis: str, y_axis: str, title: str) -> None:
    # Create DataFrame from CSV data
    data = pd.read_csv(csv_path)

    # Extract data for plotting
    x = data.columns
    y = data.iloc[0]

    # Plot the data
    fig = plt.plot(x, y)

    # Add labels and title
    plt.xlabel(x_axis)
    plt.ylabel(y_axis)
    plt.title(title)

    # Save the plot as PNG
    plt.savefig(os.path.join(SAVE_AVG_PLOTS, f"{title}.png"))

    plt.close()


def compute_all_avgs():
    generate_average(get_cpu_path(EMBEDDINGS_PATH), "avg_embeddings_cpu.csv")
    generate_average(get_memory_path(EMBEDDINGS_PATH),
                     "avg_embeddings_memory.csv")
    generate_average(get_tasks_path(EMBEDDINGS_PATH),
                     "avg_embeddings_tasks.csv")
    generate_average(get_memory_reservation_path(EMBEDDINGS_PATH),
                     "avg_embeddings_memory_reservation.csv")
    generate_average(get_cpu_reservation_path(EMBEDDINGS_PATH),
                     "avg_embeddings_cpu_reservation.csv")

    generate_average(get_cpu_path(RESERAVATIONS_PATH),
                     "avg_reservations_cpu.csv")
    generate_average(get_memory_path(RESERAVATIONS_PATH),
                     "avg_reservations_memory.csv")
    generate_average(get_tasks_path(RESERAVATIONS_PATH),
                     "avg_reservations_tasks.csv")
    generate_average(get_memory_reservation_path(RESERAVATIONS_PATH),
                     "avg_reservations_memory_reservation.csv")
    generate_average(get_cpu_reservation_path(RESERAVATIONS_PATH),
                     "avg_reservations_cpu_reservation.csv")

    generate_average(get_cpu_path(RESTAURANTS_PATH), "avg_restaurants_cpu.csv")
    generate_average(get_memory_path(RESTAURANTS_PATH),
                     "avg_restaurants_memory.csv")
    generate_average(get_tasks_path(RESTAURANTS_PATH),
                     "avg_restaurants_tasks.csv")
    generate_average(get_memory_reservation_path(RESTAURANTS_PATH),
                     "avg_embeddings_memory_reservation.csv")
    generate_average(get_cpu_reservation_path(RESTAURANTS_PATH),
                     "avg_embeddings_cpu_reservation.csv")

    generate_average(get_cpu_path(USERS_PATH), "avg_users_cpu.csv")
    generate_average(get_memory_path(USERS_PATH), "avg_users_memory.csv")
    generate_average(get_tasks_path(USERS_PATH), "avg_users_tasks.csv")
    generate_average(get_memory_reservation_path(USERS_PATH),
                     "avg_users_memory_reservation.csv")
    generate_average(get_cpu_reservation_path(USERS_PATH),
                     "avg_users_cpu_reservation.csv")

    generate_average(get_cpu_path(PROXY_PATH), "avg_proxy_cpu.csv")
    generate_average(get_memory_path(PROXY_PATH), "avg_proxy_memory.csv")
    generate_average(get_tasks_path(PROXY_PATH), "avg_proxy_tasks.csv")
    generate_average(get_memory_reservation_path(PROXY_PATH),
                     "avg_proxy_memory_reservation.csv")
    generate_average(get_cpu_reservation_path(PROXY_PATH),
                     "avg_proxy_cpu_reservation.csv")


def save_all_plots():
    for file in os.listdir(SAVE_AVG_PATH):
        _, service, resource = file.split("_")
        resource = resource.split(".")[0]

        abspath = os.path.join(SAVE_AVG_PATH, file)
        plot_csv(abspath, "Minutes", "Value",
                 f"{service.capitalize()} - {resource.capitalize()}")


compute_all_avgs()
save_all_plots()
